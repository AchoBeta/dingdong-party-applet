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
      confirm_development_time: e.detail.value.confirm_development_time,
      probationary_time:e.detail.value.probationary_time,
      branch_opinions_in_half_year:e.detail.value.branch_opinions_in_half_year,
      activities:[{
        activity_time:e.detail.value.activity_time1,
        activity_address:e.detail.value.activity_address1,
        activity_content:e.detail.value.activity_content1,
        activity_organizer:e.detail.value.activity_organizer1
      },{
        activity_time:e.detail.value.activity_time2,
        activity_address:e.detail.value.activity_address2,
        activity_content:e.detail.value.activity_content2,
        activity_organizer:e.detail.value.activity_organizer2
      },{
        activity_time:e.detail.value.activity_time3,
        activity_address:e.detail.value.activity_address3,
        activity_content:e.detail.value.activity_content3,
        activity_organizer:e.detail.value.activity_organizer3
      },{
        activity_time:e.detail.value.activity_time4,
        activity_address:e.detail.value.activity_address4,
        activity_content:e.detail.value.activity_content4,
        activity_organizer:e.detail.value.activity_organizer4
      }]
    }
    wx.showLoading({
      title: '正在提交..',
      mask: true
    })
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/prepare',
      method:"POST",
      header:{Authorization:wx.getStorageSync('Authorization')},
      data:formData,
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
        wx.showModal({
          title:"提示",
          content:"网络错误，请重试"
        })
      },
      complete(res){
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  }
})