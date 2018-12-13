from tkinter import *           # 导入 tkinter 库
import tkinter
import xlrd
import math
data = xlrd.open_workbook("C:\\Users\\46507\Desktop\\123.xls") #将excel表格导入
sheets = data.sheets()
sheet_1_by_name = data.sheet_by_name(u'Sheet1')
userID = list(map(int, sheet_1_by_name.col_values(2))) #将excel中用户编号列导入
ProductID = list(map(int, sheet_1_by_name.col_values(6))) #将excel中产品编号导入
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

#print(relation)



root = tkinter.Tk()
#400x300：代表初始化时主窗口的大小，300,100分别代表窗口的初始化位置
#x:为小写的x
root.geometry('400x300+300+100')

label=tkinter.Label(root,text="请输入用户号")
label.pack()

t1 = tkinter.StringVar()
# t1.set('春季里那个百花开')
entry = tkinter.Entry(root, textvariable = t1).pack()



#print("请输入想推荐的用户id(1-302)")

def tuijian():
    getid = t1.get()
    print (getid)
    uid = getid
    #print(uid)
    news_userID = []  
    for id in userID:  
        if id not in news_userID:  
            news_userID.append(id)  
    #print (news_userID)#去重

    goods_list = list(relation[news_userID[int(uid)-1]])
    #print(goods_list)
    z = 0
    while z < len(goods_list):
        goods_list[z] = int(goods_list[z])
        z += 1
    similarityTwo = {}
    # 存该用户与每个用户的相似度
    for key3 in relation.keys():
        similarityTwo[key3] = len(set(goods_list) & set(relation[key3])) \
                              / math.sqrt((len(set(goods_list))) * len(set(relation[key3])))
    #以上为计算两用户间的相似度确定邻居,余弦算法
    fff = zip(similarityTwo.values(), similarityTwo.keys())
    # fff存放用户编号以及对应的相似度，fff为字典不能排序，需要转化
    ggg = sorted(fff)
    #按照相似度排列，从低到高
    qqqqTwo = 0
    tagtagTwo = 1
    kkTwo = 5
    #print(ggg.__len__())
    recommend_set_Two = set()
    neighbors = {}
    #print(ggg)
    while qqqqTwo < kkTwo and tagtagTwo <= len(ggg):
    # 循环五次，每次取出相似度最大的用户的商品，
    # 1.判断是否完全相同 
    # 2.判断是否比指定用户买的东西少 
    # 3.前面两种情况都不满足，则对该用户与要推荐的用户的商品做差集，存入recommend_set_Two，
    # 每次做差集之后和之前用户做完差集的结果做并集，随后recommend_set_Two中即存了相似度最
    # 高的五个用户与推荐用户差集的集合，neighbor中存五个用户以及他们对应的商品
    #    print(ggg.__len__()-tagtagTwo)
        if ggg[ggg.__len__()-tagtagTwo][0] == 1.0:
    #        print("1")
            tagtagTwo += 1
            continue
        elif len(set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) -
                 (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) & set(goods_list))) == 0:
            tagtagTwo += 1
    #        print("2")
            continue
        else:
    #        print("3")
            recommend_set_Two = recommend_set_Two | (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) -
                                                     (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) &
                                                      set(goods_list)))
            neighbors[int(ggg[ggg.__len__() - tagtagTwo][1])] = ggg[ggg.__len__() - tagtagTwo][0]
            qqqqTwo += 1
            tagtagTwo += 1
    #print(recommend_set_Two)
    recommend_set_Two = list(recommend_set_Two)
    #print(recommend_set_Two)
    if len(recommend_set_Two) == 0:
        print("您买的物品基本覆盖了全部商品，没有为您推荐的物品")

    #print("邻居", neighbors)
    index = 0
    dict_Three = {}

    while index < len(recommend_set_Two):
        dict_Three[recommend_set_Two[index]] = 0.0
        index += 1

    for indexFour in relation:
        relation[indexFour] = list(set(relation[indexFour]))

    indexTwo = 0
    for indexOne in neighbors:
        while indexTwo < len(relation[int(indexOne)]):
            for indexThree in dict_Three:
                if relation[int(indexOne)][indexTwo] == indexThree:
                    dict_Three[indexThree] += neighbors[indexOne]
                    break
            indexTwo += 1
        indexTwo = 0
    #计算这五个用户中所有的购买的商品的权重
    #print(dict_Three)
    
    ffffff = zip(dict_Three.values(), dict_Three.keys())
    gggggg = sorted(ffffff)
    #print(gggggg)
    wer = 0
    list_range = []
    while wer < len(gggggg):
        list_range.append(gggggg[wer][1])
        wer += 1

    #print(list_range)
    list_range.reverse()
    #print(list_range)
    kkk = 5
    if len(list_range) > kkk:
        list_range = list_range[0:kkk]
    #取出权重最大的五个商品进行推荐
    print("为你推荐商品:", list_range)
    #print(str(list_range))
    t2 = tkinter.StringVar()
    t2.set(list_range)
    entry = tkinter.Entry(root, textvariable = t2).pack()
'''
注意：
    输入商品编号的时候以英文,逗号分隔，比如：1,2,3,4
    商品编号为1-21，可以输入其他不存在商品编号，但是推荐没有意义
    如果输入的商品编号均不存在，则推荐绝大多数用户都喜欢的商品，为热销商品
    不能什么都不输入
'''
Button(root,width=8,height=1,text='提交',command=tuijian).pack()

label2=tkinter.Label(root,text="向该用户推荐的商品为：")
label2.pack()
