//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
  },
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this
    var question//存问题
    var answer1, answer2//存答案,answer1存放每个问题的答案，answer2存放每个问题的选项
    var j = 0;
    getApp().globalData.newQuesNum = 0;
    wx.request({//取出问题
      //url: 'https://vnuyheuv.qcloud.la/extractquestions.php',
      url: 'https://924010491.joesgod.club/extractquestions.php',//生产环境，数据库密码6cnPngqN
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        question = res.data.split("|");//这里将返回的数据按“|”分开存入数组question中
        j = 0;
        for (var i = 0; i < question.length - 1; i++) {//注意这里i的范围
          var temp = 'titles[' + j + ']'//这里使array的下标可以动态改变，titles代表问题题目，用来对前台渲染
          j++;
          that.setData({
            [temp]: question[i]    //注意：这里item必须要加[]，至于为什么我也不明白
          })
        }

      }
    })
    wx.request({//取出答案
      //url: 'https://vnuyheuv.qcloud.la/extractanswers.php',
      url: 'https://924010491.joesgod.club/extractanswers.php',//生产环境，数据库密码6cnPngqN
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        answer1 = res.data.split("|");//将每个问题的答案存入answer1中(此时选项还未区分)

        for (var i = 0; i < answer1.length - 1; i++) {//注意i的范围
          answer2 = answer1[i].split(" ");//将每个问题的答案按空格区分，并存入answer2(存每个问题的选项)数组中
          for (j = 0; j < answer2.length - 1; j++) {//对某一问题的选项进行遍历
            var temp = 'as[' + i + '][' + j + ']'//这里使array的下标可以动态改变，as代表answer，存问题答案，对前台进行渲染
            that.setData({
              [temp]: answer2[j]    //注意：这里item必须要加[]，至于为什么我也不明白
            })
          }
        }
      }
    })
  },
  tianjia: function(e) {
    console.log('哈');
    console.log(getApp().globalData.newQuesNum);
    console.log('哈');
    getApp().globalData.newQuesNum += 1;
    console.log('哈');
    var answer= new Array();
    console.log('哈');
    var i=0;
    console.log('哈');
    for (; i < getApp().globalData.newQuesNum;i++){
      answer[i]='1';
    }
    console.log('哈');
    console.log(answer);
    console.log('哈');
    for (i = 0; i < getApp().globalData.newQuesNum; i++) {
      var temp = 'newQues[' + i +']';
    }
    console.log('哈');
    this.setData({
      [temp]:answer,
    })
    console.log('哈');
  },
  //表单提交按钮
  formSubmit: function (e) {
    var adminCode = getApp().globalData.AdminAccount;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var formData = e.detail.value;//存前台传来的数据，这里formData为object类型
    var k, i, j;
    var mysubmit = new Array();//mysubmit用来存放传入后台的数据
    i = 0;
    j = 0;
    for (k in formData) {//遍历前台提交的数据并存入数组，遍历object类型时，只能用这种遍历方法
      console.log(k + "：" + formData[k]);
      mysubmit[i] = "'" + formData[k] + "'";//将每个问题答案存入mysubmit数组中，以实现将数据动态传入后台
      i++;
    }
    for (j = 0; j < i; j++) {//校验是否为空
      if (mysubmit[j].length == 2) console.log("空")//字符串本身带有''所以初始为2个字符
      else console.log("非空")
    }
    this.setData({//这里每个事件均对应一个data，比如在onload中的data不能和formsubmit中的data共用
      mysubmit: mysubmit
    })

    wx.request({

      url: 'https://924010491.joesgod.club/xiugaiwenjuan.php',//生产环境，数据库密码6cnPngqN
      //url: 'https://vnuyheuv.qcloud.la/insert.php',//开发环境
      //url: 'https://vnuyheuv.qcloud.la/xiugaiwenjuan.php',//开发环境newinsert
      data:
      {
        mysubmit,
        adminCode
      },

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {

        var err = res.data.error
        if (err) {
          this.setData({
            error: err
          })
        }
        else {
          console.log("返回成功的数据:" + res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据  
          console.log("返回成功的数据:" + JSON.stringify(res.data)) //这样就可以愉快的看到后台的数据啦
        }
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }


    })
    wx.navigateTo({
      url: '/pages/xiugaichenggong/xiugaichenggong',
    })
    this.setData({
      allValue: e.detail.value
    })
    getApp().globalData.newQuesNum = 0;
  },
  

})
