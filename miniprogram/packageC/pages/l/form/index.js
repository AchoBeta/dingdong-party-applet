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
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Info/28',
      method:"GET",
      header:{
        Authorization:wx.getStorageSync('Authorization')
      },
      success(res){
        that.setData({
          form_data: res.data
        })
        console.log(res)
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
    wx.showLoading({
      title: '正在提交..',
      mask:true
    })
    var formData = {
      birthplace: e.detail.value.birthplace,
      education: e.detail.value.education,
      duty: e.detail.value.duty,
      current_habitation: e.detail.value.current_habitation,
      expertise: e.detail.value.expertise,
      aspiration: e.detail.value.aspiration,
      experience: e.detail.value.experience,
      family_members: e.detail.value.family_members,
      problem_to_party: e.detail.value.problem_to_party,
      introduce_opinion_for_application: e.detail.value.introduce_opinion_for_application
    }
    console.log(formData)
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/application',
      header:{Authorization:wx.getStorageSync('Authorization')},
      method:"POST",
      data:formData,
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