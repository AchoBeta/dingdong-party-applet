//app.js
const base_url = 'https://www.dingdongtongxue.com/Party/public/index.php'
const api = require("./style/api.js")
App({
  onLaunch: function() {
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
      keyName:undefined,
      name:undefined,
      casid:undefined,
      class:undefined,
      branch_name:undefined,
      MODES:false,
      APIUrlHead : 'http://121.5.0.60:81'
    }
    try {
      const res = wx.getSystemInfoSync()
      console.log(res)
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
                if (res.code) {
                  //发起网络请求
                  api.request.get(
                    base_url + '/common/token/getToken', //url
                    {
                      code: res.code
                    }, //data
                  ).then((e) => {
                    api.getStorage
                    var token = e.data.Authorization
                    api.setStorage('Authorization', token)
                    api.setStorage('Authorization_deadtime', (new Date().getTime()))
                    callBack(token)
                  }).catch((err)=>{
                    wx.showModal({
                      title: '警告',
                      content: '账号登录失败或已失效，请点击确认重新登录',
                      success (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/login/index'
                          })
                        } else if (res.cancel) {
                        }
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
    }
    else{
      callBack(wx.getStorageSync("Authorization"))
    }
  }
})