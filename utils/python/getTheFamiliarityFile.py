# 使用说明(与项目无关可随时删除)
# 1 需要python3 https://www.python.org/downloads/
# 2 安装依赖包
#   > pip install tqdm
# 3 执行
#   > python3 getTheFamiliarityFile.py

import difflib
import os
from tqdm import tqdm

#### 配置参数
# 需要对比的文件路径
comparison_file_path = './src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningPosition/selectGroup.vue'
# 筛选相似度X以上的文件
similarity_threshold = 0.8

def get_similarity_ratio(file1, file2):
    try:
        with open(file1, 'r', encoding='utf-8', errors='ignore') as f1, open(file2, 'r', encoding='utf-8', errors='ignore') as f2:
            lines1 = f1.read()
            lines2 = f2.read()
            return difflib.SequenceMatcher(None, lines1, lines2).ratio()
    except Exception as e:
        print(f"无法读取文件 {file1} 或 {file2}: {e}")
        return 0

def find_similar_files(src_directory, comparison_file_path, similarity_threshold):
    similar_files = []
    comparison_file_path = os.path.abspath(comparison_file_path)
    _, comparison_extension = os.path.splitext(comparison_file_path)
    
    if not os.path.isfile(comparison_file_path):
        print("配置的comparison_file_path不是一个文件。")
        return similar_files

    all_files = []
    for root, _, files in os.walk(src_directory):
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.lower() != comparison_file_path.lower() and file.endswith(comparison_extension):
                all_files.append(file_path)

    with tqdm(total=len(all_files), desc="正在检查相似性") as pbar:
        for file_path in all_files:
            pbar.update(1)
            if os.path.isfile(file_path):
                similarity_ratio = get_similarity_ratio(file_path, comparison_file_path)
                if similarity_ratio >= similarity_threshold:
                    similar_files.append((file_path, similarity_ratio))

    similar_files.sort(key=lambda x: x[1], reverse=True)
    return similar_files

src_directory = './src'

similar_files = find_similar_files(src_directory, comparison_file_path, similarity_threshold)

comparison_file_absolute_path = os.path.abspath(comparison_file_path)

if similar_files:
    for file_path, similarity in similar_files:
        if os.path.abspath(file_path) != comparison_file_absolute_path:
            similarity_formatted = "{:.2f}".format(similarity)
            print(f"相似度: {similarity_formatted} 文件路径: {file_path}")
else:
    print("无相似文件")