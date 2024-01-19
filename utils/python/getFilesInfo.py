# 获取文件getPathList1.json/getPathList3.json里面的数据
# 文件1的格式为string[], 文件2的格式为string[][]
# 我希望得到getFilesInfo1.json文件，文件内容为文件2和文件1的集合, 格式为string[][]
# 集合规则：在文件2中出现的过的元素，就不用重复出现了

# import json

# # 读取文件1 getPathList1.json
# with open('getPathList1.json', 'r', encoding='utf-8') as f:
#     file1_data = json.load(f)

# # 读取文件2 getPathList3.json
# with open('getPathList3.json', 'r', encoding='utf-8') as f:
#     file2_data = json.load(f)

# # 转换文件2为单一列表以便检查成员资格
# flat_file2_data = [item for sublist in file2_data for item in sublist]

# # 添加文件1数据到文件2，检查是否需要增加
# for item in file1_data:
#     if isinstance(item, list):
#         # 如果项目是列表并且列表的所有项都不在文件2中，那么将其添加到文件2
#         if all(val not in flat_file2_data for val in item):
#             file2_data.append(item)
#     else:
#         # 如果项目是字符串并且不存在于文件2，那么将其添加到文件2
#         if item not in flat_file2_data:
#             file2_data.append([item])

# # 写入新文件 getFilesInfo1.json
# with open('getFilesInfo1.json', 'w', encoding='utf-8') as jsonf:
#    json.dump(file2_data, jsonf)


# 获取文件getPathList3.json里面的数据，写入getFilesInfo2.json，格式为string[][]，如果string[]里面的与另一个string[]里面的sting有重复，就合并成一个string[]，并去重
import json

def process_data():
    with open("getPathList3.json", "r") as read_file:
        data = json.load(read_file)

    output = []
    for item in data:
        found = False
        for out_item in output:
            if any(i in out_item for i in item):
                out_item.update(item)
                found = True
                break
        if not found:
            output.append(set(item))

    output = [list(x) for x in output]

    with open("getFilesInfo2.json", "w") as write_file:
        json.dump(output, write_file)

# 调用此函数
process_data()