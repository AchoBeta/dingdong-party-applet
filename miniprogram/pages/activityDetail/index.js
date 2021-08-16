// pages/activityDetail/index.js
const app = getApp()
const {
  getActivityDetail,
  applyParticipation,
  getActivityPeopleNum
} = require("../../utils/api.js")
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
    // console.log(e)
    wx.navigateTo({
      url: '../leave/index?activityId=' + e.currentTarget.dataset.activityid + '&activityName=' + e.currentTarget.dataset.activityname,
    })
  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  //根据id请求活动详情数据
  async ActivityDetail(activityId) {
    var that = this
    getActivityDetail(activityId).then(res => {
      // console.log(res)
      that.setData({
        activity: res.data.data.item
      })
    }).catch(err => {
      //已在request.js处理
    })
  },

  //获取活动人数
  async NumOfPeople(activityId) {
    var that = this
    getActivityPeopleNum(activityId).then(res => {
      that.setData({
        NumOfPeople: res.data.data.items.length
      })
    })
  },

  //申请参与活动
  applyToParticipation() {
    var activityId = this.data.activityId
    // var activityId = ""
    var userId = wx.getStorageSync('userInfo').userId

    if (activityId == null) {
      wx.showToast({
        title: '请从活动详情页重新进入此页面',
        icon: "none"
      })
    } else {
      applyParticipation(userId, activityId).then(res => {
        wx.showToast({
          title: '提交成功',
        })
        //返回上一页面
        setTimeout(e => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }).catch(err => {
        wx.showToast({
          title: '提交失败',
          icon : "error"
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.partStatus)
    this.ActivityDetail(options.activityId)
    this.NumOfPeople(options.activityId)

    this.setData({
      partStatus: options.partStatus,
      activityId: options.activityId,
      TabIndex: options.TabIndex
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