//app.js
const base_url = 'https://www.dingdongtongxue.com/Party/public/index.php'
const api = require("./style/api.js")
const {
  requestToken
} = require("utils/api.js")

App({
  onLaunch: function () {
    const that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // 登录
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    this.globalData = {
      userInfo: null,
      windowHeight: undefined,
      statusBar: undefined,
      nowStep: 11,
      nowKey: 3,
      fileList: [1],
      baseUrl: 'https://www.dingdongtongxue.com/Party/public/index.php',
      keyName: undefined,
      name: undefined,
      casid: undefined,
      class: undefined,
      branch_name: undefined,
      MODES: false,
      // APIUrlHead : 'http://121.5.0.60:81'
      APIUrlHead: 'https://www.dingdongtongxue.com/api/dingdong-party'
    }
    try {
      const res = wx.getSystemInfoSync()
      // console.log(res)
      that.globalData.windowHeight = res.windowHeight
      that.globalData.screenHeight = res.screenHeight
      wx.getSystemInfo({
        success: e => {
          this.globalData.StatusBar = e.statusBarHeight;
          let custom = wx.getMenuButtonBoundingClientRect();
          this.globalData.Custom = custom;
          this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        }
      })
    } catch (e) {
      // Do something when catch error
    }

    this.getToken() //判断token是否过期
  },

  //获取openid
  async getOpenId() {
    var userInfo = {}

    await wx.cloud.callFunction({
      name: 'getOpenID',
      data: {}
    }).then((res) => {
      // console.log('[云函数] [getOpenID] user openid: ', res.result.openid);
      userInfo.openId = res.result.openid
    }).catch((err) => {
      console.log(err)
    })

    // console.log(userInfo)
    wx.setStorageSync("userInfo", userInfo); //存入缓存
  },

  //判断token是否过期
  async getToken() {
    var that = this
    return new Promise((resolve, reject) => {
      var userInfo = wx.getStorageSync('userInfo')
      // console.log(userInfo)
      let token_deadtime = wx.getStorageSync('token_deadtime')
      //判断有没有进行微信的用户登录，是否有openid
      if (userInfo.openId.length != 0) {
        if ((new Date().getTime() - token_deadtime) > 1800000) { //判断token是否过期，30min
          //已过期，重新请求
          requestToken(userInfo.openId).then(res => {
            // userInfo = wx.getStorageSync('userInfo')
            userInfo.userId = res.data.data.item.userId
            userInfo.name = res.data.data.item.name
            userInfo.studentId = res.data.data.item.studentId
            userInfo.teacherId = res.data.data.item.teacherId
            userInfo.branchId = res.data.data.item.branchId
            userInfo.branchName = res.data.data.item.branchName
            userInfo.groupId = res.data.data.item.groupId
            userInfo.groupName = res.data.data.item.groupName
            userInfo.stageId = res.data.data.item.stageId
            userInfo.stage = res.data.data.item.stage
            userInfo.taskId = res.data.data.item.taskId
            userInfo.status = res.data.data.item.status
            userInfo.statusReason = res.data.data.item.statusReason
            userInfo = res.data.data.item
            // console.log(res.data.data.item.userId)
            wx.setStorageSync('userInfo', userInfo)

            //设置token的缓存和过期时间
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('token_deadtime', (new Date().getTime()))

            resolve('成功')
          }).catch(err=>{
            reject('失败')
            //接口请求失败
          })
        } else {
          //token未过期
          // console.log("token未过期")
        }
      } else {
        //无openid
        //引导用户重新执行getOpenId

        this.getOpenId()
      }
      resolve('成功')
    })
  },

  //使用接口获取token
  requestToken() {
    const userInfo = wx.getStorageSync('userInfo')
    var that = this
    
    wx.request({
      url: that.globalData.APIUrlHead + '/base/users/login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
      },
      data: {
        openId: userInfo.openId
      },
      success(res) {
        console.log(res)
        if (res.data.message == "成功") {         
          var userInfo = wx.getStorageSync('userInfo')
          userInfo.userId = res.data.data.item.userId
          userInfo.name = res.data.data.item.name
          userInfo.studentId = res.data.data.item.studentId
          userInfo.teacherId = res.data.data.item.teacherId
          userInfo.branchId = res.data.data.item.branchId
          userInfo.branchName = res.data.data.item.branchName
          userInfo.groupId = res.data.data.item.groupId
          userInfo.groupName = res.data.data.item.groupName
          userInfo.stageId = res.data.data.item.stageId
          userInfo.stage = res.data.data.item.stage
          userInfo.taskId = res.data.data.item.taskId
          userInfo.status = res.data.data.item.status
          userInfo.statusReason = res.data.data.item.statusReason
          userInfo = res.data.data.item
          // console.log(res.data.data.item.userId)
          wx.setStorageSync('userInfo', userInfo)

          //设置token的缓存和过期时间
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('token_deadtime', (new Date().getTime()))
        } else {
          wx.showToast({
            title: '请重新登录',
            icon: "error"
          })
        }

      }
      
    })
  },

  Login(callBack) {
    wx.showLoading({
      title: '加载中..',
      mask: true
    })
    try {
      var DDL = wx.getStorageSync("Authorization_deadtime")
      if (!DDL) {
        DDL = 0
      }
    } catch (e) {
      console.log(e)
      var DDL = 0
    }
    let NOW = new Date().getTime()
    if (NOW - DDL > 2400000) {
      wx.login({
        success: res => {
          if (res.code) {
            wx.login({
              success: res => {
                // console.log(res)
                if (res.code) {
                  //发起网络请求
                  api.request.get(
                    base_url + '/common/token/getToken', //url
                    {
                      code: res.code
                    }, //data
                  ).then((e) => {
                    console.log(e)
                    api.getStorage
                    var token = e.data.Authorization
                    api.setStorage('Authorization', token)
                    api.setStorage('Authorization_deadtime', (new Date().getTime()))
                    callBack(token)
                  }).catch((err) => {
                    wx.showModal({
                      title: '警告',
                      content: '账号登录失败或已失效，请点击确认重新登录',
                      success(res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/login/index'
                          })
                        } else if (res.cancel) {}
                      }
                    })
                    wx.hideLoading()
                  })
                } else {
                  api.showModal("警告", "登录失败，请退出重新登录")
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
        }
      })
    } else {
      callBack(wx.getStorageSync("Authorization"))
    }
  },
})