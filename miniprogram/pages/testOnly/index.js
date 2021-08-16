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

    //查看自己信息
    async showUserInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/info',
        method: 'GET',
        header: {
          'token': token
        },
        success(res) {
          console.log(res)
        }
      })
    },
  
    //创建用户
    async updateUserInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      // var studentId = wx.getStorageSync('userInfo').studentId
  
      var userInfo = {
        "birthday": "",
        "branchId": "",
        "branchName": "",
        "className": "",
        "classPosition": "",
        "dormitoryArea": "",
        "dormitoryNo": "",
        "familyAddress": "",
        "gender": true,
        "grade": 0,
        "groupId": "",
        "groupName": "",
        "idCard": "",
        "institute": "",
        "joinLeagueTime": "",
        "major": "",
        "name": "asd",
        "nation": "",
        "origin": "",
        "phone": "",
        "stage": 0,
        "stageId": 0,
        "studentId": "201943362335",
        "taskId": 0
      }
  
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users',
        method: 'PUT',
        data: userInfo,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success(res) {
          console.log(res)
        }
      })
    },
  
    //修改学生信息
    async updateStudentInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      var studentId = wx.getStorageSync('userInfo').studentId
  
      var studentEntity = {
        "birthday": "",
        "branchId": "",
        "branchName": "",
        "className": "",
        "classPosition": "",
        "dormitoryArea": "",
        "dormitoryNo": "",
        "familyAddress": "",
        "gender": true,
        "grade": 0,
        "groupId": "",
        "groupName": "",
        "idCard": "",
        "institute": "",
        "joinLeagueTime": "",
        "major": "",
        "name": "asd",
        "nation": "",
        "origin": "",
        "phone": "",
        "stage": 0,
        "stageId": 0,
        "studentId": studentId,
        "taskId": 0
      }
  
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/students/' + studentId,
        method: 'PUT',
        data: studentEntity,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success(res) {
          console.log(res)
        }
      })
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
    // applyForLeave("1419162725304542567", "1423870335597969136", "reason封装002").then(res => {
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