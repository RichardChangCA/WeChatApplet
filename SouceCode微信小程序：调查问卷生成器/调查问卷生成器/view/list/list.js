Page({
  data: {
    message: 'hello 大程序',
    list: []
  },

  onLoad() {
    // 加载数据并呈现到页面上
    // this.data.message = XX 不可以
    // this.setData({
    //   // 动态的修改一个页面的数据
    //   message:Date.now()
    // })
    //
    const _this = this
    wx.request({
      // url:'http://t.yushu.im/v2/movie/in_theaters',
      url: 'https://172.93.34.11:27022/recommend.py',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // body...
        console.log(res.data)
        _this.setData({
          //list:res.data.subjects
          list: res.data
        })
      }

    })
  }

})