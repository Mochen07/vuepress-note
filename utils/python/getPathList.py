# 获取文件夹里面有components路径下的文件的相似度为0.85的路径集合
import os
import json
from datasketch import MinHash, MinHashLSH
from nltk import ngrams

def get_path_list():
    path_list = []

    def display_folder_path(start_path):
        if not os.path.exists(start_path):
            print(f'No such directory: {start_path}')
            return

        for root, _, files in os.walk(start_path):
            if '/components/' in root:
                for file in files:
                    if file.endswith('.vue'):
                        path_list.append(os.path.join(root, file))

    folder_path = './src'
    display_folder_path(folder_path)
    
    return path_list

def save_path_list_to_json(path_list, file_path):
    with open(file_path, 'w') as f:
        json.dump(path_list, f)

# 获取文件夹里面有components路径下的文件路径列表
components_path_list = get_path_list()

save_path_list_to_json(components_path_list, 'getPathList1.json')

lsh = MinHashLSH(threshold=0.85, num_perm=128)

minhash_objects = {}
total_files = len(components_path_list)

for idx, file_path in enumerate(components_path_list):
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        m = MinHash(num_perm=128)
        for gram in ngrams(content, 3):
            m.update("".join(gram).encode('utf-8'))
        
        lsh.insert(idx, m)
        minhash_objects[idx] = m

        print(f"Processing file {idx + 1} of {total_files}, {((idx + 1) / total_files) * 100:.2f}% completed")

    except Exception as e:
        print(f"Error occurred when processing file {file_path}.")
        raise e

similarity_dict = {}

for idx, file_path in enumerate(components_path_list):
    try:
        result = lsh.query(minhash_objects[idx])
        
        # 将索引换算为文件路径并排除当前文件
        result_paths = [components_path_list[i] for i in result if i != idx]

        # print("Approximate neighbours (Jaccard similarity > 0.85) with", file_path, ":", result_paths)

        similarity_dict[file_path] = result_paths

    except Exception as e:
        print(f"Error occurred when querying similarity for file {file_path}.")
        raise e

# 相似度对比的原始文件
save_path_list_to_json(similarity_dict, 'getPathList2.json')

# 处理similarity_dict的数据：
# 1. 将aaa: [bbb]的处理成[aaa, bbb]
# 2. 去重。比如[aaa, bbb], [bbb, aaa]保留一个就好
# 3. 删除处理后的数据中只有1条的数组，就是是aaa: []的数据
res = [sorted([k]+v) for k, v in similarity_dict.items()]
res = list(set(tuple(i) for i in res if len(i) > 1)) 

print('0.85', len(res))
# 保存处理后的结果
save_path_list_to_json(res, 'getPathList3.json')