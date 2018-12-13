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
            relation[userID[i - 1]] = lists
            item = userID[i]
            lists = []
            continue
    relation[userID[i - 1]] = lists
    for k in relation:
        relation[k] = set(relation[k])
    pro_length = len(set(ProductID))
    support_para = {}
    for j in set(ProductID):
        i = 0  # 支持度计数
        for k in relation:
            if j in relation[k]:
                i += 1
        support_para[j] = i
    s = {}  # 支持度
    c = {}  # 置信度
    for k in support_para:
        s[k] = support_para[k] / len(relation)
        c[k] = support_para[k] / support_para[k]
    mins = 0.1  # 支持度阈值
    minc = 0.8  # 置信度阈值
    s2 = {}
    c2 = {}
    for k in s:
        if s[k] >= mins and c[k] >= minc:
            s2[k] = s[k]
            c2[k] = c[k]
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
                s3[i, j] = ss3[i, j] / len(relation)
                c3[i, j] = ss3[i, j] / support_para[i]
    s4 = {}
    c4 = {}
    for k in s3:
        if s3[k] >= mins and c3[k] >= minc:
            s4[k] = s3[k]
            c4[k] = c3[k]
    get = Product_list[number]
    get = list(get.split(','))
    n = 0
    while n < len(get):
        get[n] = int(get[n])
        n += 1
    tuijian = []
    n = 0
    while n < len(get):
        for k in s4:
            if get[n] == k[0]:
                tuijian.append(k[1])
            elif get[n] == k[1]:
                tuijian.append(k[0])
        n += 1
    tuijian = set(tuijian)
    n = 0
    while n < len(get):
        if get[n] in tuijian:
            tuijian.remove(get[n])
        n += 1
    if len(tuijian) == 0:
        tuijian = "没有商品向你推荐."
    print("向你推荐:", tuijian)
    subject = "关联规则算法商品推荐:\n"  # 主题
    content = "为你推荐商品编号" + str(tuijian) +\
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