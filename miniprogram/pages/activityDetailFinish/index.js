// pages/activityDetailFinish/index.js
const app = getApp()

const {
  getActivityDetail,
  getActivityPeopleNum,
  FirstPublishExperience,
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
    commentList: [],
    updateExperience: false,
    myCommentId: "",
  },

  topBack(e) {
    wx.navigateBack({})
    // console.log("asd")
  },

  // showModal(e) {
  //   this.setData({
  //     modalName: e.currentTarget.dataset.target
  //   })
  // },
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
      that.requestComment(that.data.activityId)
    }).catch(err => {
      wx.showToast({
        title: '提交失败，请重新提交',
        icon: "none"
      })
      that.hideModal()
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
      wx.showToast({
        title: '请重新加入页面',
        icon: "loading"
      })
    })
  },

  //根据id查询活动人数
  async NumOfPeople(activityId) {
    var that = this
    getActivityPeopleNum(activityId).then(res => {
      that.setData({
        NumOfPeople: res.data.data.items.length
      })
    })
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
      that.requestComment(that.data.activityId)
    }).catch(err => {
      wx.showToast({
        title: '请重新提交',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
    // console.log(options.id)
    this.ActivityDetail(options.activityId)
    this.NumOfPeople(options.activityId)
    this.Comments(options.activityId)

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