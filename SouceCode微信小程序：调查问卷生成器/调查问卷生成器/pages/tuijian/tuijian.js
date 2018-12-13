// pages/tuijian/tuijian.js
const app = getApp()
Page({
  data:{
    one: [{
      message: '服装:耐克Nike拼色宽松运动休闲外套拉链套头衫',
      url: "https://gd2.alicdn.com/imgextra/i4/555216074/TB2qABGXH3nBKNjSZFMXXaUSFXa_!!555216074.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.1.307172e8YRm5z9&id=565116682202&ns=1&abbucket=2#detail"
    }, {
        message: '包包:欧洲站休闲双肩包学生书包旅行包',
        url:"https://gd1.alicdn.com/imgextra/i1/889924411/TB2oCCba29TBuNjy1zbXXXpepXa_!!889924411.jpg",
        shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.9.267466c0zKrkeA&id=564997064154&ns=1&abbucket=2#detail"
    },
    {
      message: '彩妆:Mon Paris反转巴黎香水30ml',
      url: "https://gd4.alicdn.com/imgextra/i3/379623585/TB2ZwJvkYYI8KJjy0FaXXbAiVXa_!!379623585.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.13.6c3719dc4bmWUE&id=561917001112&ns=1&abbucket=2#detail"
    },
    {
      message: '鞋:耐克Nike Roshe Run One黑白跑鞋',
      url: "https://gd3.alicdn.com/imgextra/i1/0/TB1KDzCqNuTBuNkHFNRXXc9qpXa_!!0-item_pic.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.27.229b4a92LdisuV&id=534707284692&ns=1&abbucket=2"
    },
    ],
    two: [{
      message: '服装:阿迪达斯三叶草 外套 CW1256',
      url: "https://gd1.alicdn.com/imgextra/i2/55607773/TB2f6LFa6b.heNjSZFAXXchKXXa_!!55607773.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.49.6f5c49b1x98cSB&id=563650283809&ns=1&abbucket=2#detail"
    }, {
        message: '包包:DCSHOECOUSA/DC 运动迷彩单肩背挎包腰包',
      url: "https://img.alicdn.com/imgextra/i2/1612713147/TB1PgtVzhWYBuNjy1zkXXXGGpXa_!!0-item_pic.jpg_430x430q90.jpg",
      shangpinurl:"https://detail.tmall.com/item.htm?spm=a230r.1.14.1.567c25d2vSVOXa&id=567375797566&cm_id=140105335569ed55e27b&abbucket=2&skuId=3827162818177"
    },
    {
      message: '彩妆:纪梵希高定香榭睫毛底膏',
      url: "https://img.alicdn.com/imgextra/i2/3570503317/TB22YM5eWLN8KJjSZFKXXb7NVXa_!!3570503317.jpg",
      shangpinurl:"https://detail.tmall.com/item.htm?spm=a230r.1.14.16.72ae6d7bqpcd7C&id=563545065121&ns=1&abbucket=2"
    },
    {
      message: '鞋:特步跑步鞋 运动透气舒适减震旋科技',
      url: "https://img.alicdn.com/imgextra/i4/353571709/TB2TLEtd9cqBKNjSZFgXXX_kXXa_!!353571709.jpg",
      shangpinurl:"https://detail.tmall.com/item.htm?spm=a230r.1.14.1.50d47ea0LeOO7b&id=565339658132&cm_id=140105335569ed55e27b&abbucket=2"
    },
    ],
    three: [{
      message: '服装:阿迪达斯neo外套休闲防风衣CV6959',
      url: "https://img.alicdn.com/imgextra/i2/2800169176/TB2AAF9dYZnBKNjSZFhXXc.oXXa_!!2800169176.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.20.a1de24d5iRTxHJ&id=568387391359&ns=1&abbucket=2#detail"
    }, {
        message: '包包:凯莉包 单肩斜挎包小手提包潮',
      url: "https://img.alicdn.com/imgextra/i3/2259593980/TB2ZtLugDtYBeNjy1XdXXXXyVXa_!!2259593980.jpg",
      shangpinurl:"https://detail.tmall.com/item.htm?spm=a230r.1.14.14.22c01b87O7PDFP&id=551805583204&cm_id=140105335569ed55e27b&abbucket=2"
    },
    {
      message: '彩妆:Freeplus芙丽芳丝净润洗面霜100g*2',
      url: "https://img.alicdn.com/imgextra/i2/3596650093/TB27zkVixWYBuNjy1zkXXXGGpXa_!!3596650093-0-scmitem3000.jpg",
      shangpinurl:"https://detail.tmall.com/item.htm?spm=a230r.1.14.20.528d23a1m7NImO&id=549572908110&ns=1&abbucket=2"
    },
    {
      message: '鞋:鸿星尔克 跑步鞋蓝色',
      url: "https://img.alicdn.com/imgextra/i3/349740505/TB2EqzOeBfM8KJjSZFhXXcRyFXa_!!349740505.jpg",
      shangpinurl:"https://item.taobao.com/item.htm?spm=a230r.1.14.22.2e6d2335xfJNoE&id=564013074298&ns=1&abbucket=2#detail"
    },
    ],
    four: [{
      message: '服装:NPC潮牌 FLOAT YUZUKI.S 龙凤斗系列',
      url: "https://img.alicdn.com/imgextra/i2/TB1koYpNVXXXXb4XVXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
      shangpinurl: "https://detail.tmall.com/item.htm?spm=a230r.1.14.40.a1de24d5iVhx4b&id=540622130891&ns=1&abbucket=2"
    }, {
        message: '包包:ISSEYMIYAK 六格6格纯色菱格手提单肩包',
      url: "https://gd1.alicdn.com/imgextra/i4/TB1s_SNrUR1BeNjy0FmYXH0wVXa_M2.SS2_400x400.jpg",
      shangpinurl: "https://item.taobao.com/item.htm?spm=a230r.1.14.21.22c01b872OsXtY&id=569863418832&ns=1&abbucket=2#detail"
    },
    {
      message: '彩妆:丸美弹力蛋白凝时紧致6件套装补水化妆品',
      url: "https://img.alicdn.com/imgextra/i4/3626437150/TB2CdxCgpkoBKNjSZFEXXbrEVXa_!!3626437150-0-item_pic.jpg_430x430q90.jpg",
      shangpinurl: "https://detail.tmall.com/item.htm?id=564504184811&ali_refid=a3_430583_1006:1151893358:N:%E5%8C%96%E5%A6%86%E5%93%81:fc9ffc87e38ec61885f295af2e71a4cc&ali_trackid=1_fc9ffc87e38ec61885f295af2e71a4cc&spm=a230r.1.14.1"
    },
    {
      message: '鞋:耐克Nike Roshe Run One黑白跑鞋',
      url: "https://gd3.alicdn.com/imgextra/i1/0/TB1KDzCqNuTBuNkHFNRXXc9qpXa_!!0-item_pic.jpg",
      shangpinurl: "https://item.taobao.com/item.htm?spm=a230r.1.14.27.229b4a92LdisuV&id=534707284692&ns=1&abbucket=2"
    },
    ],
    five: [{
      message: '服装:中年男装夹克薄款春装中老年人夏季',
      url: "https://img.alicdn.com/imgextra/i4/2261850503/TB2T.Sqi7SWBuNjSszdXXbeSpXa_!!2261850503-0-item_pic.jpg_430x430q90.jpg",
      shangpinurl: "https://detail.tmall.com/item.htm?spm=a230r.1.14.47.740816caH6LEiW&id=566745556210&ns=1&abbucket=2"
    }, {
        message: '包包:中老年人包包百搭婆婆单肩斜挎包中年',
      url: "https://gd2.alicdn.com/imgextra/i3/555810276/TB2TngUh2DH8KJjy1XcXXcpdXXa_!!555810276.jpg_400x400.jpg",
      shangpinurl: "https://item.taobao.com/item.htm?spm=a230r.1.14.101.66b738dbCpDeio&id=562092750817&ns=1&abbucket=2#detail"
    },
    {
      message: '鞋:足力健夏季鞋子男中老年运动鞋',
      url: "https://img.alicdn.com/imgextra/i4/3287104402/TB2Z.NYlntYBeNjy1XdXXXXyVXa_!!3287104402.jpg_430x430q90.jpg",
      shangpinurl: "https://detail.tmall.com/item.htm?spm=a230r.1.14.6.45887c039EgeM2&id=567337847104&cm_id=140105335569ed55e27b&abbucket=2"
    },
    ]
  },
 
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    console.log(getApp().globalData.userid);
    var that = this
    var a;
    var userid;
    var answer;
    var result;
    var tuijian = new Array(5);
    userid = getApp().globalData.userid;
    console.log("userid is", userid);
    wx.request({//取出userid对应填写的答案
      //url: 'https://vnuyheuv.qcloud.la/extractuseranswer.php',
      url: 'https://924010491.joesgod.club/extractuseranswer.php',//生产环境，数据库密码6cnPngqN
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        userid: userid
      },
      success: function (res) {
        console.log(res.data);
        answer = res.data.split("|");//这里将返回的数据按“|”分开存入数组question中
        //console.log(answer[0]);
            if (answer[0]=='男'){
              answer[0] = 1;
            }else{
              answer[0] = 0;
            }
            console.log(answer[0]);
            console.log(answer[1]);
             if (answer[2] == '0') {
               answer[2] = 1;
             } else if (answer[2] == '1000-3000'){
               answer[2] = 2;
             } else if (answer[2] == '3000-5000') {
               answer[2] = 3;
             } else if (answer[2] == '5000-7000') {
               answer[2] = 4;
             } else if (answer[2] == '7000-9000') {
               answer[2] = 5;
             } else{
               answer[2] = 6;
             }
             console.log(answer[2]);
             if (answer[3] == '学生') {
               answer[3] = 1;
             } else if (answer[3] == '老板'){
               answer[3] = 2;
             } else{
               answer[3] = 3;
             }
             console.log(answer[3]);
             if (answer[4] == '本科以下') {
               answer[4] = 1;
             } else if (answer[4] == '本科') {
               answer[4] = 2;
             }else if (answer[4] == '硕士') {
               answer[4] = 3;
             } else {
               answer[4] = 4;
             }
             console.log(answer[4]);
             if (answer[5] == '已婚') {
               answer[5] = 1;
             } else {
               answer[5] = 2;
             }
             console.log(answer[5]);
             //第一组
             result = Math.sqrt(Math.pow(answer[0] - 0.5714285714285714, 2) + Math.pow((answer[1] - 26.642857142857142) / 10, 2) + Math.pow(answer[2] - 4.5, 2) + Math.pow(answer[3] - 2.9285714285714284, 2) + Math.pow(answer[4] - 1.7857142857142858, 2) + Math.pow(answer[5] - 1.5, 2));
             //console.log(result);
             tuijian[0] = result;
             //第二组
             result = Math.sqrt(Math.pow(answer[0] - 0.3684210526315789, 2) + Math.pow((answer[1] - 40.98245614035088) / 10, 2) + Math.pow(answer[2] - 2.3903508771929824, 2) + Math.pow(answer[3] - 2.942982456140351, 2) + Math.pow(answer[4] - 1.3245614035087718, 2) + Math.pow(answer[5] - 1.0526315789473684, 2));
             //console.log(result);
             tuijian[1] = result;
             //第三组
             result = Math.sqrt(Math.pow(answer[0] - 0.453781512605042, 2) + Math.pow((answer[1] - 20.176470588235293) / 10, 2) + Math.pow(answer[2] - 1.3529411764705883, 2) + Math.pow(answer[3] - 1, 2) + Math.pow(answer[4] - 1.8067226890756303, 2) + Math.pow(answer[5] - 1.9411764705882353, 2));
             //console.log(result);
             tuijian[2] = result;
             //第四组
             result = Math.sqrt(Math.pow(answer[0] - 0.35294117647058826, 2) + Math.pow((answer[1] - 24.176470588235293) / 10, 2) + Math.pow(answer[2] - 5.764705882352941, 2) + Math.pow(answer[3] - 2.235294117647059, 2) + Math.pow(answer[4] - 3.3529411764705883, 2) + Math.pow(answer[5] - 1.588235294117647, 2));
             //console.log(result);
             tuijian[3] = result;
             //第五组
             result = Math.sqrt(Math.pow(answer[0] - 1, 2) + Math.pow((answer[1] - 76) / 10, 2) + Math.pow(answer[2] - 2.5, 2) + Math.pow(answer[3] - 1.5, 2) + Math.pow(answer[4] - 2, 2) + Math.pow(answer[5] - 1.5, 2));
             //console.log(result);
             tuijian[4] = result;
             console.log(tuijian);
             //找出最小距离的类
             a = tuijian.indexOf(Math.min.apply(Math, tuijian));
             console.log(a);
             that.setData({
               a: a
             });
             
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    
    
  },
})