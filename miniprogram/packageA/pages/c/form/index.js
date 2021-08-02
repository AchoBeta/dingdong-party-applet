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
    const that = this
    wx.showLoading({
      title: '数据加载中..',
      mask: true
    })
    this.getNote().then(res=>{
      that.setData({
        form_data:res
      })
      console.log(res)
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
  toBack(e){
    wx.navigateBack()
  },
  getNote(e){
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Info/1',
        method:"GET",
        header:{
          Authorization:wx.getStorageSync('Authorization')
        },
        success:res=>{
          resolve(res.data)
        },
        fail:res=>{
          reject(res)
        },
        complete:res=>{
          wx.hideLoading()
        }
      })
    })
  },
  form_submit(e){
    console.log(e)
    wx.showLoading({
      title: '正在提交..',
      mask:true
    })
    var formData = e.detail.value
    if(formData.gender == '男'){
      formData.gender = 1
    } else{
      formData.gender = 0
    }
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/apply',
      header:{Authorization:wx.getStorageSync('Authorization')},
      method:"POST",
      data:e.detail.value,
      success(res){
        console.log(res)
        wx.hideLoading({
          complete: (res) => {
            wx.navigateBack({
              complete: (res) => {
                wx.showToast({
                  title: '提交成功',
                })
              },
            })
          },
        })
      },
      fail(res){
        wx.showModal({
          title:"提示",
          content:"网络错误，请重试"
        })
      }
    })
  }
})