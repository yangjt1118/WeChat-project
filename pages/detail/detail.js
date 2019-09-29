// pages/detail/detail.js
let datas=require('../../datas/list-data.js')
console.log(datas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //获取参数值
    let index=options.index
    //更新data中的detailObj的状态值
    this.setData({
      detailObj:datas.list_data[index],
      index
    });
    //根据本地缓存数据判断用户是否收藏当前文章
   let detailStorage= wx.getStorageSync('isCollected')
   console.log(detailStorage)
   if(!detailStorage){
     //在缓存中初始化空对象
     wx.setStorageSync('isCollected', {})
   }
  //判断用户是否收藏
  if(detailStorage[index]){
    this.setData({
      isCollected:true
    })
  }
  },
  handleCollect() {
    console.log(this)
    let isCollected = !this.data.isCollected
    //更新状态
    this.setData({
      isCollected
    });
    //提示用户
    let title=isCollected?'收藏成功':'取消收藏'
    wx.showToast({
      title,
      icon:"success"
    });
    //缓存数据到本地
    let {index}=this.data
    //不可行，会覆盖之前的状态
    // let obj={}
    wx.getStorage({
      key: 'isCollected',
      success: (datas) =>{
        // console.log(datas,typeof datas)
        let obj = datas.data
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        })
      },
    })
  },
  handleMusicPlay(){
    //处理音乐播放
    let isMusicPlay=!this.data.isMusicPlay
    this.setData({
      isMusicPlay
    });
    //控制音乐播放
    if(isMusicPlay){
      //播放音乐
      let {dataUrl,title}=this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio()
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