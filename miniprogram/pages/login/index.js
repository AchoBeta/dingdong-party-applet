// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    casid:undefined,
    name:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
      mask:true
    })
  },
  hiddd(e){
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  getCasid(e){
    this.setData({
      casid:e.detail.value
    })
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getInfo(e){
    const that = this
    console.log(e)
    
    wx.getSetting({
      success:getS_res=> {
        if (getS_res.authSetting['scope.userInfo']){
          wx.showLoading({
            title: '绑定中..',
          })
          app.globalData.userInfo = getS_res.userInfo
          wx.request({
            url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/bindCasId',
            method:"POST",
            header:{Authorization:wx.getStorageSync('Authorization')},
            data:{
              casId:that.data.casid,
              name:that.data.name
            },
            success(res){
              console.log(res)
              if(!res.data.error_code && res.data.code != "401"){
                wx.showToast({
                  title: '欢迎使用',
                })
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }else if (res.data.code == "401"){
                
                if(res.data.msg == "你的账号已经绑定过了"){
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }else{
                  wx.showModal({
                    title:"提示",
                    content:res.data.msg
                  })
                }
              }
              else{
                wx.showModal({
                  title:"提示",
                  content:res.data.msg
                })
              }
            },
            fail(res){
              wx.showModal({
                title:"提示",
                content:res.data.msg
              })
              console.log(res)
            },
            complete(res){
              wx.hideLoading({
                complete: (res) => {
                  
                },
              })
            }
          })
        }else{
          wx.showModal({
            title:"提示",
            content:"您选择了取消授权，点击确认重新选择，不然不能进行下一步哦"
          },res=>{
            if (res.confirm) {
              wx.openSetting()
            } else {}
          })
        }
      },
      complete: (res) => {},
    })
    
  },
  toLLL(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})