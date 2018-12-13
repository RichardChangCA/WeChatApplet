// pages/tijiaohou/tijiaohou.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "https://vnuyheuv.qcloud.la/提交成功.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/xuanzewenjuan/xuanzewenjuan',
    })
  },
  tuijian: function (e) {
    var id;
    id = getApp().globalData.wenjuanid;
    console.log("id is", id);
    if(id == 1){
      wx.navigateTo({
        url: '/pages/tuijian/tuijian',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '该问卷尚未进行数据分析，无法推荐',
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