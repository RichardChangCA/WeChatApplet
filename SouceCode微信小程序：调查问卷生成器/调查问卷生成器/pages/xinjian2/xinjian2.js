// pages/xinjian2/xinjian2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answer = new Array();
    var i = 0;
    for (; i < getApp().globalData.newQuesNum; i++) {
      answer[i] = '1';
    }
    console.log(answer);
    for (i = 0; i < getApp().globalData.newQuesNum; i++) {
      var temp = 'newQues[' + i + ']';
    }
    this.setData({
      [temp]: answer,
    })
  },
  tianjia: function (e) {
    console.log(getApp().globalData.newQuesNum);
    getApp().globalData.newQuesNum += 1;
    var answer = new Array();
    var i = 0;
    for (; i < getApp().globalData.newQuesNum; i++) {
      answer[i] = '1';
    }
    console.log(answer);
    for (i = 0; i < getApp().globalData.newQuesNum; i++) {
      var temp = 'newQues[' + i + ']';
    }
    this.setData({
      [temp]: answer,
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})