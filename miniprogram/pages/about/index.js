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
  getInfo,
  getStage
} = require("../../utils/api.js")

Page({
  data: {
    motto: 'Hello World',
    // userInfo: wx.getStorageSync('userInfo'),
    wxInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
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
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    var userId = userInfo.userId
    getInfo(userId).then(res => {
      console.log(res)
      var mainInfo = res.data.data.item.main
      var detailInfo = res.data.data.item.details
      if(mainInfo.studentId){
        var stageId = mainInfo.stageId
        this.setData({
          name : mainInfo.name,
          casid : mainInfo.studentId,
          groupName : mainInfo.groupName,
          class : detailInfo.className,
        })
        getStage(stageId).then(res => {
          console.log(res.data.data.item.name)
          this.setData({
            keyName : res.data.data.item.name
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad: function () {
    // app.getToken()
    // app.requestToken()
    if(wx.getUserProfile){
      this.setData({
        canIUseGetUserProfile: true,
        wxInfo: wx.getStorageSync('wxInfo')
      })
      if(this.data.wxInfo){
        this.setData({
          hasUserInfo: true,
        })
      }
    }
    this.StudentInfo()
    // this.setData({
    //   keyName: app.globalData.keyName,
    //   name: app.globalData.name,
    //   casid: app.globalData.casid,
    //   class: app.globalData.class
    // })
    // 查看是否授权
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        // wx.setStorageSync('wxInfo', res.userInfo)
        this.setData({
          wxInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('wxInfo', res.userInfo)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      wxInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //   console.log(app.globalData.userInfo)
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       // hasUserInfo: true
  //     })
  //     console.log(app.globalData.userInfo);
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         // hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           // hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   var getUser = e.detail.userInfo
  //   var userInfo = getUser
  //   this.setData({
  //     userInfo: userInfo,
  //     // hasUserInfo: true
  //   })
  // },
  
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