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
    z = 0
    while z < len(goods_list):
        goods_list[z] = int(goods_list[z])
        z += 1
    similarityTwo = {}
    for key3 in relation.keys():
        similarityTwo[key3] = len(set(goods_list) & set(relation[key3])) \
                              / math.sqrt((len(set(goods_list))) * len(set(relation[key3])))
    fff = zip(similarityTwo.values(), similarityTwo.keys())
    ggg = sorted(fff)
    qqqqTwo = 0
    tagtagTwo = 1
    kkTwo = 5
    recommend_set_Two = set()
    neighbors = {}
    while qqqqTwo < kkTwo and tagtagTwo <= len(ggg):
        if ggg[ggg.__len__() - tagtagTwo][0] == 1.0:
            tagtagTwo += 1
            continue
        elif len(set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) -
                 (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) & set(goods_list))) == 0:
            tagtagTwo += 1
            continue
        else:
            recommend_set_Two = recommend_set_Two | (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) -
                                                     (set(relation[int(ggg[ggg.__len__() - tagtagTwo][1])]) &
                                                      set(goods_list)))
            neighbors[int(ggg[ggg.__len__() - tagtagTwo][1])] = ggg[ggg.__len__() - tagtagTwo][0]
            qqqqTwo += 1
            tagtagTwo += 1
    recommend_set_Two = list(recommend_set_Two)
    if len(recommend_set_Two) == 0:
        print("您买的物品基本覆盖了全部商品，没有为您推荐的物品")
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
    ffffff = zip(dict_Three.values(), dict_Three.keys())
    gggggg = sorted(ffffff)
    wer = 0
    list_range = []
    while wer < len(gggggg):
        list_range.append(gggggg[wer][1])
        wer += 1
    list_range.reverse()
    kkk = 5
    if len(list_range) > kkk:
        list_range = list_range[0:kkk]
    print("为你推荐商品:", list_range)

    subject = "基于用户协同过滤算法商品推荐:\n"  # 主题
    content = "为你推荐商品编号" + str(list_range) +\
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