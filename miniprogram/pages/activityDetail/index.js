// pages/activityDetail/index.js
const app = getApp()
const {
  getActivityDetail,
  applyParticipation,
  getActivityPeopleNum,
  updateExperience,
  getComments
} = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    activity: {},
    partStatus: null, //请假状态
    commentList: [],
    updateExperience: false,
    myCommentId: "",
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

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  writeExperience(e) { //显示心得弹出层
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
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
      // console.log(err)
    })
  },

  //获取活动人数
  async NumOfPeople(activityId) {
    var that = this
    getActivityPeopleNum(activityId).then(res => {
      // console.log(res)
      that.setData({
        NumOfPeople: res.data.data.items.length
      })
    }).catch(err => {
      //已在request.js处理
      console.log(err)
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
        console.log(err)
        wx.showToast({
          title: '提交失败',
          icon : "error"
        })
      })
    }
  },

  //查询所有心得评论
  async Comments(activityId) {
    var that = this

    var params = {
      page: 1,
      size: 20
    }
    getComments(activityId, params).then(res=>{
      that.setData({
        commentList: res.data.data.list.items
      })
      that.checkUpdateExperience()
    }).catch(err=>{
      wx.showToast({
        title: '请重新加入页面',
        icon: "loading"
      })
    })
  },

  //判断是否已发布过心得，再使用更新心得功能
  checkUpdateExperience() {
    let commentList = this.data.commentList
    var userId = wx.getStorageSync('userInfo').userId
    let updateExperience = commentList.some(v => {
      return v.userId == userId
    })
    let myCommentId = ""
    let textareaValue = ""

    for (let i = 0; i < commentList.length; i++) {
      if (commentList[i].userId == userId) {
        myCommentId = commentList[i].id
        textareaValue = commentList[i].content
        // console.log(myCommentId)
        break
      }
    }
    // console.log(updateExperience)
    this.setData({
      updateExperience,
      myCommentId,
      textareaValue
    })
  },

  //首次提交心得评论
  async PublishExperience() {
    var that = this

    var comment = {
      activityId: this.data.activityId,
      content: this.data.textareaValue,
      id: "",
      image: "",
      userId: wx.getStorageSync('userInfo').userId
    }

    FirstPublishExperience(comment.activityId, comment).then(res => {
      wx.showToast({
        title: '发布成功',
      })
      that.hideModal()
      that.Comments(that.data.activityId)
    }).catch(err => {
      wx.showToast({
        title: '提交失败，请重新提交',
        icon: "none"
      })
      that.hideModal()
    })
  },

  //更新心得
  async updateExperience() {
    var that = this

    var comment = {
      activityId: this.data.activityId,
      content: this.data.textareaValue,
      id: this.data.myCommentId,
      image: "",
      userId: wx.getStorageSync('userInfo').userId
    }

    updateExperience(comment.activityId, comment.id, comment).then(res => {
      wx.showToast({
        title: '更新成功',
      })
      that.hideModal()
      that.Comments(that.data.activityId)
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '请重新提交',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.partStatus)
    this.ActivityDetail(options.activityId)
    this.NumOfPeople(options.activityId)
    this.Comments(options.activityId)//改为已完成再发请求

    this.setData({
      partStatus: options.partStatus,
      activityId: options.activityId,
      TabIndex: options.TabIndex,
      apply : options.apply
    })

    // console.log(options.apply)
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