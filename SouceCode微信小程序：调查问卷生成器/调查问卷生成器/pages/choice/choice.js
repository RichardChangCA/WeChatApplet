Page({
  jinru: function (e) {
    console.log('点击进入调查问卷按钮，进入调查问卷页面')
    wx.navigateTo({
      url: '/pages/xuanzewenjuan/xuanzewenjuan',
    })
  },
  denglu: function (e) {
    console.log('点击管理员登录按钮，进入管理员页面')
    wx.navigateTo({
      url: '/pages/guanliyuan/guanliyuan',
    })
  },
  tuijian: function(e) {
    console.log('点击进入推荐商品品牌页面')
    wx.navigateTo({
      url: '/pages/xuanzepingpai/xuanzepingpai',
    })
  }
})