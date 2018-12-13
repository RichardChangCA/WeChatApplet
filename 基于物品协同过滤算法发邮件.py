#coding=utf-8
import smtplib
from email.mime.text import MIMEText
import xlrd
import math

data_tuijian = xlrd.open_workbook("C:\\Users\\46507\Desktop\\456.xlsx") #将excel表格导入
sheets = data_tuijian.sheets()
sheet_2_by_name = data_tuijian.sheet_by_name(u'Sheet1')
Product_list = list(map(str, sheet_2_by_name.col_values(0)))
email_list = list(map(str, sheet_2_by_name.col_values(1)))
print(Product_list)
print(email_list)

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
relation[userID[i-1]] = lists
number = 0
while number < len(Product_list):
    msg_from = '905479655@qq.com'  # 发送方邮箱
    passwd = 'ilcnikplqbmlbfdf'  # 填入发送方邮箱的授权码
    msg_to = email_list[number]  # 收件人邮箱
    goods_list = Product_list[number]
    goods_list = list(goods_list.split(','))

    data = xlrd.open_workbook("C:\\Users\\46507\Desktop\\123.xls")  # 将excel表格导入
    sheets = data.sheets()
    sheet_1_by_name = data.sheet_by_name(u'Sheet1')
    userID = list(map(int, sheet_1_by_name.col_values(2)))  # 将excel中用户编号列导入
    ProductID = list(map(int, sheet_1_by_name.col_values(6)))  # 将excel中产品编号导入
    i = 0
    dict_prod_popul = {}
    while i < len(userID):  # 计算买各个产品的用户数量及次数
        if (ProductID[i] not in dict_prod_popul.keys()):
            dict_prod_popul[ProductID[i]] = []
            dict_prod_popul[ProductID[i]].append(userID[i])
        else:
            dict_prod_popul[ProductID[i]].append(userID[i])
        i += 1
    for index in dict_prod_popul:  # 计算买各个产品的用户数量
        dict_prod_popul[index] = list(set(dict_prod_popul[index]))
    similarity = {}  # 计算两两物品间的相似度
    for index_one in dict_prod_popul:
        for index_two in dict_prod_popul:
            if index_one == index_two:
                continue
            similarity[index_one, index_two] = len(set(dict_prod_popul[index_one]) & set(dict_prod_popul[index_two])) / \
                                               math.sqrt(
                                                   len(dict_prod_popul[index_one]) * len(dict_prod_popul[index_two]))
    goods_list = Product_list[number]
    goods_list = list(goods_list.split(','))
    i = 0
    while i < len(goods_list):
        goods_list[i] = int(goods_list[i])
        i += 1
    i = 0
    k = 5
    find = {}  # 将这些物品所有的所有有关的相似度相加，找出与这些物品最相似的商品
    while i < len(goods_list):
        for index_four in similarity:
            if goods_list[i] == index_four[0]:
                if index_four[1] not in find:
                    find[index_four[1]] = similarity[index_four]
                else:
                    find[index_four[1]] += similarity[index_four]
        i += 1
    f = zip(find.values(), find.keys())  # 将权重从小到大排序
    g = sorted(f)
    recommend = []
    i = 1
    while i <= k:
        recommend.append(g[len(g) - i][1])
        i += 1
    print("为你推荐：", recommend)
    subject = "基于物品协同过滤算法商品推荐:\n"  # 主题
    content = "为你推荐商品编号" + str(recommend) +\
              "\n商品编号对应商品如下: 1:adidas,2:chanel,3:ck,4:coach,5:dior,6:GUCCI,7:lamer,8:MAC,9:mk,10:nars,11:tf," \
              "12:tory,13:ysl,14:阿玛尼,15:彪马,16:纪梵希,17:玖熙,18:科颜氏,19:兰蔻,20:小ck,21:雅诗兰黛" # 正文
    msg = MIMEText(content)
    msg['Subject'] = subject
    msg['From'] = msg_from
    msg['To'] = msg_to
    try:
        s = smtplib.SMTP_SSL("smtp.qq.com", 465)  # 邮件服务器及端口号
        s.login(msg_from, passwd)
        s.sendmail(msg_from, msg_to, msg.as_string())
        print("发送成功")
    except s.SMTPException:
        print("发送失败")
    finally:
        s.quit()
    number += 1