from tkinter import *           # 导入 tkinter 库
import tkinter
import math
import xlrd

data = xlrd.open_workbook("C:\\Users\\46507\Desktop\\123.xls") #将excel表格导入
sheets = data.sheets()
sheet_1_by_name = data.sheet_by_name(u'Sheet1')
userID = list(map(int, sheet_1_by_name.col_values(2))) #将excel中用户编号列导入
#print(userID)
ProductID = list(map(int, sheet_1_by_name.col_values(6))) #将excel中产品编号导入
#print(ProductID)
#print(str(userID[0]))

item = userID[0]
i = 0
length = len(userID)
relation = {}
lists = []
j = 0
while i < length:
    if item == userID[i]:
        lists.append(ProductID[i])
        i += 1
    else:
        relation[userID[i-1]] = lists
        item = userID[i]
        lists = []
        continue
relation[userID[i-1]] = lists  #以上将该用户ID所购买的所有产品种类对应关系放入relation字典中


root = tkinter.Tk()
#400x300：代表初始化时主窗口的大小，300,100分别代表窗口的初始化位置
#x:为小写的x
root.geometry('400x300+300+100')

label=tkinter.Label(root,text="请输入用户号")
label.pack()

t1 = tkinter.StringVar()
# t1.set('春季里那个百花开')
entry = tkinter.Entry(root, textvariable = t1).pack()

i = 0
dict_prod_popul = {}
while i < len(userID): #计算买各个产品的用户数量及次数,有重复
    if(ProductID[i] not in dict_prod_popul.keys()):
        dict_prod_popul[ProductID[i]] = []
        dict_prod_popul[ProductID[i]].append(userID[i])
    else:
        dict_prod_popul[ProductID[i]].append(userID[i])
    i += 1
#print(dict_prod_popul)

for index in dict_prod_popul: #计算买各个产品的用户数量，去处重复,例：19：[1,2,3,4,...]
    dict_prod_popul[index] = list(set(dict_prod_popul[index]))
#print(dict_prod_popul)
#print(len(set(ProductID)))

similarity = {} #计算两两物品间的相似度，例(1,2)->value
for index_one in dict_prod_popul:
    for index_two in dict_prod_popul:
        if index_one == index_two:
            continue
        similarity[index_one, index_two] = len(set(dict_prod_popul[index_one]) & set(dict_prod_popul[index_two])) / \
                                           math.sqrt(len(dict_prod_popul[index_one]) * len(dict_prod_popul[index_two]))
#print(similarity)

print("请输入想推荐的用户")


def tuijian():
    getid = t1.get()
    print (getid)
    uid = getid
    news_userID = []  
    for id in userID:  
        if id not in news_userID:  
            news_userID.append(id)  
    #print (news_userID)#去重

    goods_list = list(relation[news_userID[int(uid)-1]])
    #print(goods_list)

    i = 0
    while i < len(goods_list):
        goods_list[i] = int(goods_list[i])
        i += 1
    #print(goods_list)

    #goods_list = [1, 2, 3, 4, 5, 6]
    #print(goods_list)

    i = 0
    k = 5
    #inverse_similarity = {}
    #for index_three in similarity:
    #    inverse_similarity[similarity[index_three]] = list(index_three)
    #print(inverse_similarity)
    find = {} #将这些物品所有的所有有关的相似度相加，找出与这些物品最相似的商品
    while i < len(goods_list):
        for index_four in similarity:
            if goods_list[i] == index_four[0]:
                if index_four[1] not in find:
                    find[index_four[1]] = similarity[index_four]
                else:
                    find[index_four[1]] += similarity[index_four]
        i += 1
    #print(find)
    #print(len(find))
    f = zip(find.values(), find.keys()) #将权重从小到大排序
    g = sorted(f)
    #print(g)
    #print(len(g))
    #取出排序最高的k个
    recommend = []
    i = 1
    while i <= k:
        recommend.append(g[len(g)-i][1])
        i += 1
    print("为你推荐：", recommend)
    t2 = tkinter.StringVar()
    t2.set(recommend)
    entry = tkinter.Entry(root, textvariable = t2).pack()

#注意：基于商品的推荐算法只能输入已有的商品编号 1-21，不存在的商品编号没有相似商品，若输入不存在商品编号会报错
#输入格式用英文逗号,分隔，如：1,2,3,4
#最好不要输入相同的商品编号，若输入相同的商品编号推荐会偏向相同的商品编号的相似商品
Button(root,width=8,height=1,text='提交',command=tuijian).pack()

label2=tkinter.Label(root,text="向该用户推荐的商品为：")
label2.pack()