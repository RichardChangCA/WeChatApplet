// pages/xuanzewenjuan/xuanzewenjuan.js
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
    getApp().globalData.wenjuanid=0;
    var that = this;
    var id;//存对应表id
    var name;//存问题表名
    var question;
    var j = 0;
    wx.request({//取出内容
      //url: 'https://vnuyheuv.qcloud.la/wenjuan.php',
      url: 'https://924010491.joesgod.club/wenjuan.php',//生产环境，数据库密码6cnPngqN
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        question = res.data.split("|");//这里将返回的数据按“|”分开存入数组question中
        console.log(question);
        j = 0;
        for (var i = 0; i < question.length - 1; i+=2) {//注意这里i的范围
          name = 'titles[' + j + '][0]';
          id = 'titles[' + j + '][1]';//这里使array的下标可以动态改变，titles代表问题题目，用来对前台渲染  
      //    console.log("啊");
        //  console.log(question[i]);
         // console.log("啊");
          //console.log(question[i+1]);
          j++;
          that.setData({
            [name]: question[i],
            [id]: question[i+1]
                //注意：这里item必须要加[]，至于为什么我也不明白
          })
        }
      }
    })
  },
  quedingwenjuan:function(e){
    console.log(e.currentTarget.id);
    getApp().globalData.wenjuanid = parseInt(e.currentTarget.id);
    console.log(getApp().globalData.wenjuanid);
    wx.navigateTo({
      url: '/pages/index/index',
    })
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