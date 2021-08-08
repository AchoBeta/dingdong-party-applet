// pages/activityDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    activity: {},
    partStatus: null //请假状态
  },

  topBack(e) {
    wx.navigateBack({})
    // console.log("asd")
  },

  navToleave(e) {
    wx.navigateTo({
      url: '../leave/index?id=' + e.currentTarget.dataset.id,
    })
  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  publishExperience() {
    console.log(this.data.textareaAValue)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.partStatus)
    this.requestActivity(options.id)
    this.setData({
      partStatus: options.partStatus
    })

  },

  requestActivity(id) {
    var that = this
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': '0563-8945'
      },
      success(res) {
        that.setData({
          activity: res.data.data.item
        })
        console.log(res)
      }
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