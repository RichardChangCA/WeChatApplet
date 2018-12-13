 #-*- coding:utf-8 -*-
import numpy as np
import math
import pylab as pl


import xlrd  
data = xlrd.open_workbook("类聚(数值).xlsx") #打开excel  
table = data.sheet_by_name("Sheet1")#读sheet
nrows = table.nrows #获得行数
print (nrows)
dataset = []
#########################测试集400条数据形成5类用户################
for i in range(1,nrows-100):  #测试集约400条数据
    rows  = table.row_values(i) #行的数据放在数组里  
    rows = tuple(rows)
    #print (rows)
    dataset.append(rows)
#print (dataset)

#计算欧几里得距离,a,b分别为两个元组
def dist(a, b):
    # return math.sqrt(math.pow(a[0]-b[0], 2)+math.pow(a[1]-b[1], 2)+math.pow(a[2]-b[2], 2)
    # 	   +math.pow(a[3]-b[3], 2)+math.pow(a[4]-b[4], 2)+math.pow(a[5]-b[5], 2)
    # 	   +math.pow(a[6]-b[6], 2)+math.pow(a[7]-b[7], 2)+math.pow(a[8]-b[8], 2)
    # 	   +math.pow(a[9]-b[9], 2)+math.pow(a[10]-b[10], 2)+math.pow(a[11]-b[11], 2)
    # 	   +math.pow(a[12]-b[12], 2)+math.pow(a[13]-b[13], 2)+math.pow(a[14]-b[14], 2)
    # 	   +math.pow(a[15]-b[15], 2))
    return math.sqrt(math.pow(a[0]-b[0], 2)+math.pow((a[1]-b[1])/10, 2)+math.pow(a[2]-b[2], 2)
     	   +math.pow(a[3]-b[3], 2)+math.pow(a[4]-b[4], 2)+math.pow(a[5]-b[5], 2))

#dist_min
def dist_min(Ci, Cj):
    return min(dist(i, j) for i in Ci for j in Cj)
#dist_max
def dist_max(Ci, Cj):
    return max(dist(i, j) for i in Ci for j in Cj)
#dist_avg
def dist_avg(Ci, Cj):
    return sum(dist(i, j) for i in Ci for j in Cj)/(len(Ci)*len(Cj))

#找到距离最小的下标
def find_Min(M):
    min = 1000
    x = 0; y = 0
    for i in range(len(M)):
        for j in range(len(M[i])):
            if i != j and M[i][j] < min:
                min = M[i][j];x = i; y = j
    return (x, y, min)

#算法模型：
def AGNES(dataset, dist, k):
    #初始化C和M
    C = [];M = []
    for i in dataset:
        Ci = []
        Ci.append(i)
        #print (Ci)
        C.append(Ci)

    #print (C)#,C中存所有数据，例C[0]=[xxx,xxx] ... C[400]=[xxx,xxx]
    M = []
    for i in C:
        Mi = []
        for j in C:
            Mi.append(dist(i, j))
        M.append(Mi)#M中存两两元组之间的距离M[0]=[0.0,xxx,xxx,xxx,...]；M[1]=[xxx,0.0,xxx,...]
    #print (M)
    q = len(C)
    #print (M[0])
    #print (q)
    #合并更新
    while q > k:
        x, y, min = find_Min(M)#例：第一次找出的为x=0,y=28,min=0.0xxxxx
        #print (x,y,min)
        C[x].extend(C[y])#例：C[0]变为[(0.697, 0.46), (0.725, 0.445)]
        #print (C[x])
        C.remove(C[y])
        M = []
        for i in C:#再次重求C中两两之间的距离
            Mi = []
            for j in C:
                Mi.append(dist(i, j))
                #print (Mi)
            M.append(Mi)
        q -= 1
        print (q)#倒计时
    return C

C = AGNES(dataset, dist_avg, 5)

i=0
j=0
k=0
sum=0
AVGSUM=[[],[],[],[],[]]

while k<5:#一共有5组
    print (C[k])#第k类聚
    j=0
    while j<16:
        sum=0
        i=0
        while i<len(C[k]):
            #print(C[k][i][j])
            sum = sum+C[k][i][j]
            i = i+1
        sum = sum/len(C[k])
        print (sum)
        AVGSUM[k].append(sum)
        j=j+1
    k=k+1
print (AVGSUM)

#################提取训练集100数据对测试集400数据做训练#########
for i in range(nrows-100,nrows):  #测试集约400条数据
    rows  = table.row_values(i) #行的数据放在数组里
    j=0
    RES = []
    while j<5:
        res = math.sqrt(math.pow(rows[0]-AVGSUM[j][0], 2)+math.pow((rows[1]-AVGSUM[j][1])/10, 2)+math.pow(rows[2]-AVGSUM[j][2], 2)
     	   +math.pow(rows[3]-AVGSUM[j][3], 2)+math.pow(rows[4]-AVGSUM[j][4], 2)+math.pow(rows[5]-AVGSUM[j][5], 2))
        RES.append(res)#RES中存该条数据与五类数据的距离
        j=j+1
    print ("该用户所属类别：")
    print (RES.index(min(RES)))#输出最小元素对应下标
    print ("向该用户推荐：")
    print (AVGSUM[RES.index(min(RES))][6])
    print (AVGSUM[RES.index(min(RES))][7])
    print (AVGSUM[RES.index(min(RES))][8])
    print (AVGSUM[RES.index(min(RES))][11])
    print (AVGSUM[RES.index(min(RES))][12])
    print ("向该用户推荐完毕")
print ("End!")