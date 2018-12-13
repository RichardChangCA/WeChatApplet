//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },

  onLoad: function (options) {
    getApp().globalData.newQuesNum = 0;
  },
  numberInput: function(e){
    console.log(e.detail.value);
    getApp().globalData.newQuesNum = parseInt(e.detail.value);
  },
  queren :function(e){
    console.log(getApp().globalData.newQuesNum);
    wx.navigateTo({
      url: '/pages/xinjian2/xinjian2',
    })
  }

})
