// pages/test/index.js

const app = getApp()
const {
  getAllActivity,
  getRelatedActivity,
  getMyActivity,
  getActivityDetail,
  getActivityPeopleNum,
  applyParticipation,
  FirstPublishExperience,
  updateExperience,
  getComments,
  applyForLeave
} = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getAllActivity({page:1,size:5}).then(res=>{
    //   console.log(res)
    // })
    // getRelatedActivity({branchId:1,page:1,size:5}).then(res=>{
    //   console.log(res)
    // })
    // getMyActivity("1425629310860935169").then(res=>{
    //   console.log(res)
    // })
    // getActivityDetail("1419572434029355010").then(res => {
    //   console.log(res)
    // })
    // getActivityPeopleNum("1419572434029355010").then(res => {
    //   console.log(res)
    // })
    // applyParticipation("1425629310860935169","1419572434029355010").then(res => {
    //   console.log(res)
    // })
    var comment = {
      activityId: "1419572434029355010",
      content: "gx封装心得评论",
      id: "",
      image: "",
      userId: "1425629310860935169"
    }
    // FirstPublishExperience("1419572434029355010",comment).then(res=>{
    //   console.log(res)
    // })
    // updateExperience("1419572434029355010", "1426480504579829762", comment).then(res => {
    //   console.log(res)
    // })
    // getComments("1419572434029355010", {page:1,size:5}).then(res => {
    //   console.log(res)
    // })
    // applyForLeave("1425629310860935169", "1419572434029355010", "reason封装").then(res => {
    //   console.log(res)
    // })
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