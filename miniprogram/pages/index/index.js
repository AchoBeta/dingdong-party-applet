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
    gender: wx.getStorageSync('wxInfo').gender,
    MODE: undefined
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.requestToken()
    // console.log(app.globalData)
    const that = this
    var step = ''
    var key = ''
    var user = app.globalData.user
    var userInfo = that.data.userInfo
    var groupName = userInfo.groupName
    wx.showLoading({
      title: '数据加载中',
    })

    console.log(userInfo)
    if(wx.getStorageSync('userInfo').studentId){
      that.setData({
        MODE : true
      })
      var userId = userInfo.userId
      getInfo(userId).then(res => {
        // console.log(res)
        this.setData({
          gender: res.data.data.item.details.gender * 1
        })
        // console.log(res)
        key = res.data.data.item.main.stageId - 1
        step = res.data.order 
        try {
          if (typeof key === 'undefined' || typeof step === 'undefined') {
            // key = 3
            // step = 11
            step=1
          }
          that.setData({
            nowKey: key,
            nowStepKey: step
          })
          app.globalData.nowKey = key
          app.globalData.nowStep = step
        } catch {
          that.setData({
            nowKey: 3,
            nowStepKey: 11
          })
          app.globalData.nowKey = 3
          app.globalData.nowStep = 11
        }
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }).catch(err => {
        console.log(err)
      })
    }else{
      this.setData({
        MODE : false
      })
      wx.showToast({
        title: '您未绑定信息',
        icon: "none"
      })
    }
    // app.Login(function (token) {
    //   wx.request({
    //     // url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/bind/check',
    //     url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/login',
    //     method: "POST",
    //     header: {
    //       // Authorization: token
    //       'content-type': 'application/json', // 默认值
    //       'token': '3319-2320'
    //     },
    //     data:{
    //       openId: 1,
    //     },
    //     success(getR) {
    //       console.log(getR)
    //       if (getR.data.code != "401") {
    //         app.globalData.MODES = true
    //         that.setData({
    //           // MODE: true
    //         })
    //         console.log(app.globalData.user)
    //         wx.request({
    //           url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/+'+'{userId}'+'/info',
    //           method: "GET",
    //           header: {
    //             // Authorization: wx.getStorageSync('Authorization')
    //             'content-type': 'application/json', // 默认值
    //             'token': '3319-2320'
    //           },
    //           success(res) {
    //             console.log(res)
    //             app.globalData.name = res.data.name,
    //               app.globalData.casid = res.data.casid,
    //               app.globalData.class = res.data.class,
    //               app.globalData.keyName = res.data.role,
    //               app.globalData.branch_name = res.data.branch_name
    //             api.request.get("https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/stage", {}, {
    //                 Authorization: token
    //               })
    //               .then(e => {
    //                 key = e.data.id - 1
    //                 step = e.data.order
    //                 //20210414修改
    //                 try {
    //                   if (typeof key === 'undefined' || typeof step === 'undefined') {
    //                     key = 3
    //                     step = 11
    //                   }
    //                   that.setData({
    //                     nowKey: key,
    //                     nowStepKey: step
    //                   })
    //                   app.globalData.nowKey = key
    //                   app.globalData.nowStep = step
    //                 } catch {
    //                   that.setData({
    //                     nowKey: 3,
    //                     nowStepKey: 11
    //                   })
    //                   app.globalData.nowKey = 3
    //                   app.globalData.nowStep = 11
    //                 }
    //                 wx.hideLoading()
    //               }).catch((res) => {
    //                 that.setData({
    //                   nowKey: 3,
    //                   nowStepKey: 11
    //                 })
    //               })
    //           },
    //           fail(res) {
    //             wx.showModal({
    //               title: "提示",
    //               content: "网络错误，请重试"
    //             })
    //           }
    //         })
    //       } else {
    //         wx.showToast({
    //           title: '您未登录',
    //           icon: "none"
    //         })
    //         app.globalData.MODES = false
    //         that.setData({
    //           MODE: false
    //         })
    //       }
    //     },
    //     fail(getR) {
    //       console.log(getR)
    //       wx.hideLoading({
    //         complete: (res) => {},
    //       })
    //     }
    //   })

    // })
    let sysInfo = wx.getSystemInfoSync()
    let mbb = wx.getMenuButtonBoundingClientRect()
    that.setData({
      topText: mbb.top,
      topTextSize: mbb.height,
      windowHeight: sysInfo.windowHeight
    })

    
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
    // app.requestToken()
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