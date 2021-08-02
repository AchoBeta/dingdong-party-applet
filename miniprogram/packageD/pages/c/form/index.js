// pages/nextStep/index.js
const app = getApp()
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
    wx.showLoading({
      title: '加载数据中..',
    })
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Info/28',
      method:"GET",
      header:{Authorization	:wx.getStorageSync('Authorization')},
      success(res){
        console.log(res)
      },fail(res){
        console.log(res)
        wx.showModal({
          title:"提示",
          content:"网络错误，请重试"
        })
      },complete(res){
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  toUpForm(e) {
    wx.showModal({
      title: '提示',
      content: '是否提交审核',
      cancelText: '再想想',
      success(res) {
        if (res.confirm) {
          app.globalData.nowStep += 1
          wx.navigateBack({})
          wx.showToast({
            title: '发送成功',
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toBack(e) {
    wx.navigateBack()
  },
  form_submit(e){
    console.log(e)
    var formData = {
      confirm_development_time: confirm_development_time,
      
    }
    wx.showLoading({
      title: '正在提交..',
      mask: true
    })
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Prepare',
      method:"GET",
      data:{

      }
    })
  }
})