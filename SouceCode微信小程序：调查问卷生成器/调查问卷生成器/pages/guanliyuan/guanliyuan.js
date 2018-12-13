
Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    getApp().globalData.AdminAccount="";
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var formData = e.detail.value;//存前台传来的数据，这里formData为object类型
    var mysubmit = new Array();//mysubmit用来存放传入后台的数据
    var i,k;
    i = 0;
    for (k in formData) {//遍历前台提交的数据并存入数组，遍历object类型时，只能用这种遍历方法
      console.log(k + "：" + formData[k]);
      mysubmit[i] = "'" + formData[k] + "'";//将账号密码传入mysubmit数组中
      i++;
    }
    var account;//账号
    var password;//密码
    var item;
    var _this=this;
    account=mysubmit[0];
    password=mysubmit[1];
    wx.request({
      //url:'https://vnuyheuv.qcloud.la/verifyAdminAccount.php',
      url: 'https://924010491.joesgod.club/verifyAdminAccount.php',//生产环境，数据库密码6cnPngqN
      data:{
        account:account
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        console.log(res.data);
        item=res.data;
        var error;
        if (item == "账号错误") {
          console.log("账号不存在");
          error="账号不存在";
        }
        else {
          if (item== password) {
            console.log("登录成功");
            getApp().globalData.AdminAccount=account;
            error="登录成功";
            wx.navigateTo({
              url: '/pages/control/control',
            })
          }
          else{
            console.log("密码错误");
            error = "密码错误";
          } 
        }
        _this.setData({
          tishi: error
        })
      }
    })
  },
  formReset:function(e){
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      allValue: ''
    })
  },
  return:function(e){
    console.log('返回首页事件发生')
    wx.navigateBack({
      delta: 1
    })
  }
})

