from tkinter import *           # 导入 tkinter 库
import tkinter
import xlrd
import math
data = xlrd.open_workbook("D:\\企划与项目开发 微信小程序\\推荐\\123.xls") #将excel表格导入
sheets = data.sheets()
sheet_1_by_name = data.sheet_by_name(u'Sheet1')
userID = list(map(int, sheet_1_by_name.col_values(2))) #将excel中用户编号列导入
#print(userID)
ProductID = list(map(int, sheet_1_by_name.col_values(6))) #将excel中产品编号导入
#print(ProductID)
#print("用户数", len(list(set(userID))))
#print("商品种类数", len(list(set(ProductID))))

#list1 = [19, 17, 17]
#list2 = [16, 16, 15, 17, 19]
#print(sameproductnumber(list1, list2))
#print(len(set(list1) & set(list2)))

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
        #print(lists)
        relation[userID[i-1]] = lists
        item = userID[i]
        lists = []
        continue
#print(lists)
relation[userID[i-1]] = lists  #以上将该用户ID所购买的所有产品种类对应关系放入relation字典中
#print(len(relation))
#print(relation)
for k in relation:
    relation[k] = set(relation[k])
#print("relation:",relation)
#print(relation.keys())
pro_length = len(set(ProductID))
#print(pro_length)  #21
support_para = {}
for j in set(ProductID):
    i = 0  # 支持度计数
    for k in relation:
        if j in relation[k]:
            i += 1
    support_para[j] = i
#print("support_para:",support_para)
s = {} #支持度
c = {} #置信度
for k in support_para:
    s[k] = support_para[k]/len(relation)
    c[k] = support_para[k]/support_para[k]
#print("s:", s)
#print("c:", c)
mins = 0.1 #支持度阈值
minc = 0.8 #置信度阈值
s2 = {}
c2 = {}
for k in s:
    if s[k] >= mins and c[k] >= minc:
        s2[k] = s[k]
        c2[k] = c[k]
#print("s2:", s2)
#print("c2:", c2)
ss3 = {}
s3 = {}
c3 = {}
for i in s2:
    for j in s2:
        if i == j:
            continue
        else:
            n = 0
            for p in relation:
                if i in relation[p] and j in relation[p]:
                    n += 1
            ss3[i, j] = n
            s3[i, j] = ss3[i, j]/len(relation)
            c3[i, j] = ss3[i, j]/support_para[i]
#print("ss3:", ss3)
#print("s3:", s3)
#print("c3:", c3)

s4 = {}
c4 = {}
for k in s3:
    if s3[k] >= mins and c3[k] >= minc:
        s4[k] = s3[k]
        c4[k] = c3[k]
print("s4:", s4)
print("c4:", c4)
"""
d = []
for k in s4:
    if set(k) in d:
        continue
    else:
        #print(set(k))
        d.append(set(k))
print(d)
"""


'''
ss5 = {}
s5 = {}
c5 = {}
for i in s4:
    for j in s2:
        if j in set(i):
            continue
        else:
            n = 0
            for p in relation:
                if i[0] in relation[p] and i[1] in relation[p] and j in relation[p]:
                    n += 1
            a = list(i)
            """
            w = 0
            while w<len(a):
                print(a,"我",a[w])
                a[w]=int(a[w])
                w+=1
            """
     #       print("啦",a,int(j))
            a.append(int(j))
            a = tuple(a)
     #       print("啊", a)
            ss5[a] = n
            s5[a] = ss5[a]/len(relation)
            c5[a] = ss5[a]/ss3[i]
#print("ss5:", ss5)
#print("s5:", s5)
#print("c5:", c5)
s6 = {}
c6 = {}
for k in s5:
    if s5[k] >= mins and c5[k] >= minc:
        s6[k] = s5[k]
        c6[k] = c5[k]
#print("s6:", s6)
#print("c6:", c6)

d = []
for k in s6:
    if set(k) in d:
        continue
    else:
        #print(set(k))
        d.append(set(k))
print(d)



ss7 = {}
s7 = {}
c7 = {}
for i in s6:
    for j in s2:
        if j in set(i):
            continue
        else:
            n = 0
            for p in relation:
                if i[0] in relation[p] and i[1] in relation[p] and i[2] in relation[p] and j in relation[p]:
                    n += 1
            a = list(i)
            """
            w = 0
            while w<len(a):
                print(a,"我",a[w])
                a[w]=int(a[w])
                w+=1
            """
     #       print("啦",a,int(j))
            a.append(int(j))
            a = tuple(a)
     #       print("啊", a)
            ss7[a] = n
            s7[a] = ss7[a]/len(relation)
            c7[a] = ss7[a]/ss5[i]
#print("ss7:", ss7)
#print("s7:", s7)
#print("c7:", c7)
s8 = {}
c8 = {}
for k in s7:
    if s7[k] >= mins and c7[k] >= minc:
        s8[k] = s7[k]
        c8[k] = c7[k]
#print("s8:", s8)
#print("c8:", c8)
d = []
for k in s8:
    if set(k) in d:
        continue
    else:
        #print(set(k))
        d.append(set(k))
print(d)
'''

root = tkinter.Tk()
#400x300：代表初始化时主窗口的大小，300,100分别代表窗口的初始化位置
#x:为小写的x
root.geometry('400x300+300+100')

label=tkinter.Label(root,text="请输入商品号")
label.pack()

t1 = tkinter.StringVar()
# t1.set('春季里那个百花开')
entry = tkinter.Entry(root, textvariable = t1).pack()



#get = input("请输入商品号(1-21)")


def Ftuijian():
    get = t1.get()
    get = list(get.split(','))
    print(get)
    n = 0
    while n < len(get):
        get[n] = int(get[n])
        n += 1
    #print(get)
    tuijian = []
    n = 0
    while n < len(get):
        for k in s4:
            #print(k[0])
            if get[n] == k[0]:
                tuijian.append(k[1])
        n += 1
    tuijian = set(tuijian)

    n = 0
    while n < len(get):
        if get[n] in tuijian:
            tuijian.remove(get[n])
        elif get[n] == k[1]:
            tuijian.append(k[0])
        n += 1
    if len(tuijian) != 0:
        print("向你推荐",tuijian) #tuijian为set集合类型
        t2 = tkinter.StringVar()
        t2.set(tuijian)
    else:
        print("没有物品推荐") #tuijian为set集合类型
        t2 = tkinter.StringVar()
        t2.set("没有物品推荐")
    entry = tkinter.Entry(root, textvariable = t2).pack()

Button(root,width=8,height=1,text='提交',command=Ftuijian).pack()

label2=tkinter.Label(root,text="向该用户推荐的商品为：")
label2.pack()
