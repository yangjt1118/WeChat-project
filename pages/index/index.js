 // pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"旧得很好看",
    userInfo:{},
    isShow:true
  },
  handleClick(){
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload 页面加载')
    console.log(this)
    //判断用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          //用户已授权
          this.setData({
            isShow: false
          })
        } else {
          //没有授权
          this.setData({
            isShow: true
          })
        }
      }
    })

    //获取用户的登录信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        //更新data中的userInfo
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('获取用户数据失败')
      }
    })
  },
  getUserInfo(){},
  handleGetUserInfo(data) {
    // console.log('用户点击了', data)
    //判断用户点击的是否是也许
    if(data.detail.rawData){
      //用户电机的是允许
      this.onLoad();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(222)
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