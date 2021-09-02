//about/index.js

const api = require("../../style/api")

//获取应用实例
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
  applyForLeave,
  getBranches,
  getGroups,
  getInfo
} = require("../../utils/api.js")

Page({
  data: {
    motto: 'Hello World',
    userInfo: wx.getStorageSync('userInfo'),
    // userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    keyName: undefined, //身份（入党阶段）
    casid: undefined,   //学号/工号
    name: undefined,    //姓名
    class: undefined,   //班级
    groupName: undefined,//党支部
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../userBinding/index'
    })
  },
  async StudentInfo() {
    var userInfo = this.data.userInfo
    console.log(userInfo)
    var userId = userInfo.userId
    getInfo(userId).then(res => {
      console.log(res)
      var mainInfo = res.data.data.item.main
      var detailInfo = res.data.data.item.details
      if(mainInfo.studentId){
        this.setData({
          name : mainInfo.name,
          casid : mainInfo.studentId,
          groupName : mainInfo.groupName,
          class : detailInfo.className
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad: function () {
    // app.getToken()
    // app.requestToken()
    this.StudentInfo()
    // this.setData({
    //   keyName: app.globalData.keyName,
    //   name: app.globalData.name,
    //   casid: app.globalData.casid,
    //   class: app.globalData.class
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        // hasUserInfo: true
      })
      console.log(app.globalData.userInfo);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            // hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      // hasUserInfo: true
    })
  },
  previewFile(e) {
    console.log(e)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.path,
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath,
        })
      }
    })
  },
  bindInfo(e) {
    wx.navigateTo({
      url: '../userBinding/index',
    })
  },
  toActivity(e) {
    wx.reLaunch({
      url: '../activity/index',
    })
  },
  toApplication(e) {
    wx.navigateTo({
      url: '/pages/application/index',
    })
  },

  

})