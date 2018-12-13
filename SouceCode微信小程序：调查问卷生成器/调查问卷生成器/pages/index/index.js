//index.js
//获取应用实例
const app = getApp()
Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    console.log(getApp().globalData.wenjuanid);
    var that = this
    var question//存问题
    var answer1,answer2//存答案,answer1存放每个问题的答案，answer2存放每个问题的选项
    var j=0;
    var id;
    id = getApp().globalData.wenjuanid;
    console.log("id is",id);
    wx.request({//取出问题
      //url: 'https://vnuyheuv.qcloud.la/extractquestion.php',
      url: 'https://924010491.joesgod.club/extractquestion.php',//生产环境，数据库密码6cnPngqN
      data: {
        id:id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        console.log(res.data)
        question = res.data.split("|");//这里将返回的数据按“|”分开存入数组question中
        j=0;
        for (var i = 0; i < question.length-1; i++) {//注意这里i的范围
          var temp = 'titles[' + j + ']'//这里使array的下标可以动态改变，titles代表问题题目，用来对前台渲染
          j++;
          that.setData({
            [temp]: question[i]    //注意：这里item必须要加[]，至于为什么我也不明白
          })
        }
        getApp().globalData.idid=question[i];
        console.log(getApp().globalData.idid);
      }
    })
    wx.request({//取出答案
      //url: 'https://vnuyheuv.qcloud.la/extractanswer.php',
      url: 'https://924010491.joesgod.club/extractanswer.php',//生产环境，数据库密码6cnPngqN
      data: {
        id:id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        console.log(res.data)
        answer1 = res.data.split("|");//将每个问题的答案存入answer1中(此时选项还未区分)

        for(var i=0;i<answer1.length-1;i++){//注意i的范围
          answer2 = answer1[i].split(" ");//将每个问题的答案按空格区分，并存入answer2(存每个问题的选项)数组中
          for(j=0;j<answer2.length-1;j++){//对某一问题的选项进行遍历
            var temp = 'as[' + i + '][' + j + ']'//这里使array的下标可以动态改变，as代表answer，存问题答案，对前台进行渲染
            that.setData({
              [temp]: answer2[j]    //注意：这里item必须要加[]，至于为什么我也不明白
            })
          }
        }
      }
    })
  },

  //表单提交按钮
  formSubmit: function (e) {
    var tag = getApp().globalData.idid;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var formData = e.detail.value;//存前台传来的数据，这里formData为object类型
    var k,i,j;
    var judge;//用于判断用户是否全部填完问卷
    var mysubmit = new Array();//mysubmit用来存放传入后台的数据
    i=0;
    j=0;
    judge = 0;
    for (k in formData) {//遍历前台提交的数据并存入数组，遍历object类型时，只能用这种遍历方法
      console.log(k + "：" + formData[k]);
      mysubmit[i] = "'"+formData[k]+"'";//将每个问题答案存入mysubmit数组中，以实现将数据动态传入后台
      if (formData[k] == '') {
        judge = 1;//表示用户存在未回答的问题
      }
      i++;
    }
    
    for (j = 0; j < i; j++) {//校验是否为空
      if (mysubmit[j].length == 2) console.log("空")//字符串本身带有''所以初始为2个字符
      else console.log("非空")
    }
    if (judge == 0) {
    this.setData({//这里每个事件均对应一个data，比如在onload中的data不能和formsubmit中的data共用
      mysubmit: mysubmit
    })
  console.log("tag is",tag);
    wx.request({
      
      url: 'https://924010491.joesgod.club/newinsert.php',//生产环境，数据库密码6cnPngqN
      //url: 'https://vnuyheuv.qcloud.la/insert.php',//开发环境
      //url: 'https://vnuyheuv.qcloud.la/newinsert.php',//开发环境newinsert
      data:
      {
        mysubmit,
        tag
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
          getApp().globalData.userid = res.data;
          console.log(getApp().globalData.userid);

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
      url: '/pages/tijiaohou/tijiaohou',
    })
    this.setData({
      allValue: e.detail.value
    })
    }
    else {//用户提交了未答完的问卷

      wx.showModal({
        title: '提示',
        content: '您还有未回答的问题',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else {
            console.log('用户点击取消')
          }
        }
      })

    }
  },
  //表单重置按钮
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.setData({
      allValue: ''
    })
  },
  

  bindRadioChange: function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  
})
