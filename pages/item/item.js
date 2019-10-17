// pages/item/item.js
let datas = require('../../datas/list-data.js')
let appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraydatas :{},
    isShow:false,
    index:0,
    isplay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    let isShow = this.data.isShow
    this.setData({
      arraydatas: datas.list_data[index],
      index
    })
    let storageObj = wx.getStorageSync('isShow');
    if (storageObj){
      let isShow = storageObj[index] ? true : false;
      // 更新isCollected的值。
      this.setData({isShow});
    }else{
      storageObj = {};
      storageObj[this.data.index] = isShow;
      wx.setStorage({
        key: 'isShow',
        data: storageObj,
      })
      
    }
    // 判断当前页面音乐是否播放
    if (appData.data.isMusicPlay && appData.data.playPageIndex === index) {
      this.setData({
        isplay: true
      })
    }

    //监听音乐的播放
    wx.onBackgroundAudioPlay(()=>{
      
      this.setData({
        isplay:true
      })
      appData.data.isMusicPlay = true;
      appData.data.playPageIndex = index;
    })
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isplay: false
      })
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isplay: false
      })
    })
  },
  tochangeIsShow(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
    //点击显示收藏，取消
    let title = isShow ?"已收藏":"取消收藏"
    wx.showToast({
      title,
      icon:'success'
    })
    //缓存
    let obj = wx.getStorageSync('isShow');
    obj[this.data.index] = isShow;
    wx.setStorage({
      key: 'isShow',
      data: obj
    })
  },
  //改变音乐图标状态
  changeMusic(){
    let isplay = !this.data.isplay
    this.setData({
      isplay
    });
    if (appData.data.isMusicPlay) {
      this.setData({
        isplay: true
      })
    }
    if(isplay){
      let { dataUrl, title, coverImgUrl } = this.data.arraydatas.music
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
    }else {
      wx.pauseBackgroundAudio()
    }
    this.setData({isplay});
  },

  //点击转发按钮
  shareText(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到qq空间', '分享到微信好友'],
      itemColor: "#666"
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