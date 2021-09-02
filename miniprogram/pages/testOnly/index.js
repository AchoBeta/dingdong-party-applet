// pages/index/index.js
const app = getApp()
const api = require("../../style/api.js")
const sData = require("../../utils/testData.js")
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

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : wx.getStorageSync('userInfo'),
    groupName : wx.getStorageSync('userInfo').groupName,
    rightLeftKey: app.globalData.nowKey,
    upDownKey: 0,
    finish: true,
    nowKey: app.globalData.nowKey,
    nowStepKey: app.globalData.nowStep,
    windowHeight: undefined,
    statusBar: undefined,
    process: sData.process,
    step: sData.step,
    nowProcess: 0,
    waitMain: 0,
    mainPngSrc: "cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405mainStepPic/",
    gender: 0,
    MODE: undefined,
    testStep:[
      {url:"cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405stepNewPng/入党申请人/1.png"},
      {url:"cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405stepNewPng/入党申请人/2.png"},
      {url:"cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405stepNewPng/入党申请人/3.png"},
      {url:"cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405stepNewPng/入党申请人/4.png"},
      {url:"cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20210405stepNewPng/入党申请人/5.png"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toNowStep(e) {
    let R = String.fromCharCode(this.data.nowKey + 65)
    let S = String.fromCharCode(this.data.nowStepKey + 96)
    wx.navigateTo({
      url: '/package' + R + '/pages/' + S + '/index',
    })
  },
  onShow(options) {
    /**
     * 测试状态刷新动态效果
     */
    if (this.data.nowKey != app.globalData.nowKey) {
      this.setData({
        nowKey: app.globalData.nowKey,
        nowStepKey: app.globalData.nowStep,
      })
    }
    // console.log(app.globalData.nowKey)
  },
  downToStep(e) {
    console.log(e)
    let R = String.fromCharCode(e.currentTarget.dataset.r + 65)
    let S = String.fromCharCode(e.currentTarget.dataset.s + 97)
    wx.navigateTo({
      url: '/package' + R + '/pages/' + S + '/index',
    })
  },
  toBeforeStep(e) {
    wx.navigateTo({
      url: '/pages/beforeStep/index',
    })
  },
  toNextStep(e) {
    wx.navigateTo({
      url: '/pages/nextStep/index',
    })
  },
  changeRightLeft(e) {
    const that = this
    that.setData({
      rightLeftKey: e.detail.current
    })
  },
  changeUpDown(e) {
    const that = this
    that.setData({
      upDownKey: e.detail.current
    })
  },
  toLogin(e) {
    wx.reLaunch({
      url: '/pages/login/index',
    })
  },
  toBinding(e) {
    wx.navigateTo({
      url: '../userBinding/index',
    })
  }
})