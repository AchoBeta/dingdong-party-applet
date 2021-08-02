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
    this.getNote().then(res => {
      that.setData({
        form_data: res
      })
      console.log(res)
    }).catch(res => {
      wx.showModal({
        title: "提示",
        content: "网络错误，请重试"
      })
    })
  },
  toBack(e) {
    wx.navigateBack()
  },
  getNote(e) {
    wx.showLoading({
      title: '加载数据中..',
      mask: true
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Info/11',
        method: "GET",
        header: {
          Authorization: wx.getStorageSync('Authorization')
        },
        success: res => {
          console.log(res)
          wx.request({
            url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/develop/contacts',
            method: "GET",
            header: { Authorization: wx.getStorageSync('Authorization') },
            success(info) {
              res.data.userBranch.develop_contact_first = info.data.firstDevelopContact[0]
              res.data.userBranch.develop_contact_second = info.data.secondDevelopContact[0]
              let act = ""
              let dataAct = res.data.activities
              for (var i = 0, len = dataAct.length; i < len; i++) {
                act += "时间：" + dataAct[i].activity_time + '\n'
                act += "地点：" + dataAct[i].activity_address + '\n'
                act += "主要内容：" + dataAct[i].activity_content + '\n'
                act += "举办单位：" + dataAct[i].activity_organizer + '\n'
              }
              res.data.act = act
              resolve(res.data)
            },
            fail(e) {
              reject(res)
            }
          })

        },
        fail: res => {
          wx.showModal({
            title: "提示",
            content: "网络错误，请重新进入"
          })
        },
        complete: res => {
          wx.hideLoading()
        }
      })
    })
  },
  form_submit(e) {
    console.log(e)
    wx.showLoading({
      title: '正在提交..',
      mask: true
    })
    var formData = {
      apply_time:e.detail.value.apply_time,
      activist_time:e.detail.value.activist_time,
      awards_info:e.detail.value.awards_info,
      disposition_info:e.detail.value.disposition_info,
      investigation:[e.detail.value.investigation,e.detail.value.investigation],
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
    console.log(formData)
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/activist',
      header: { Authorization: wx.getStorageSync('Authorization') },
      method: "POST",
      data: formData,
      success(res) {
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
        wx.hideLoading({
          complete: (res) => {
            wx.showModal({
              title:"提示",
              content:"网络错误，请重试"
            })
          },
        })
      }
    })
  }
})