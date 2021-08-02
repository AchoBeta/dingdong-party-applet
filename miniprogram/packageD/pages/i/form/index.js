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
  }
})