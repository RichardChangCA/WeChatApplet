// pages/control/control.js
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
    var account;
    var adminName;
    var _this=this;
    account = getApp().globalData.AdminAccount;
    wx.request({
      //url: 'https://vnuyheuv.qcloud.la/control.php',
      url: 'https://924010491.joesgod.club/control.php',//生产环境，数据库密码6cnPngqN
      data: {
        account: account
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        console.log(res.data);
        adminName = res.data;
        _this.setData({
          name: adminName
        })
      }
      
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  xiugaiwenjuan: function(e) {
    console.log('修改问卷')
    wx.navigateTo({
      url: '/pages/xiugai/xiugai',
    })
  },
  
  xinjianwenjuan: function (e) {
    console.log('新建问卷')
    wx.navigateTo({
      url: '/pages/xinjian/xinjian',
    })
  },

  tuichu: function(e) {
    console.log('管理员退出登录')
    wx.navigateTo({
      url: '/pages/guanliyuan/guanliyuan',
    })
    getApp().globalData.AdminAccount= "";
  },
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