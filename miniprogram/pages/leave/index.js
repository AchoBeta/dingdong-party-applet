// pages/leave/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    imgList: [],
    activityID: null,
    userName: "默认名字",
    userNum: "默认学号",
    userBranch: "默认党支部"
  },

  topBack(e) {
    wx.navigateBack({})
    // console.log("asd")
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除',
      content: '确定删除？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  async formSubmit(e) {
    var activityId = this.data.activityID
    var userId = wx.getStorageSync('userInfo').userId
    var reason = e.detail.value.reason

    if (activityId == null) {
      wx.showToast({
        title: '请从活动详情页重新进入此页面',
        icon: "none"
      })
    } else {
      if (reason.length == 0) {
        wx.showToast({
          title: '请输入请假理由',
          icon: "none"
        })
      } else {
        await app.getToken() //判断token是否过期
        var token = wx.getStorageSync('token')
        wx.request({
          url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + activityId + '/users/' + userId + '/leave',
          data: {
            reason: reason
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'token': token
          },
          success(res) {
            // console.log(res)
            if (res.data.message == "成功") {
              wx.showToast({
                title: '提交成功，请等待审核',
                icon: "none"
              })
              setTimeout(res => {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
            } else {
              wx.showToast({
                title: '提交失败，请重新提交',
                icon: "none"
              })
            }
          }
        })
      }
    }
  },

  // 状态 0：正常 1：请假 2:审批通过 3：审批不通过 4: 申请加入 5：申请不通过

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('userInfo').name.length)
    const name = wx.getStorageSync('userInfo').name
    const studentId = wx.getStorageSync('userInfo').studentId
    const branchName = wx.getStorageSync('userInfo').branchName
    if (name != null && name.length != 0) {
      this.setData({
        userName: name,
        userNum: studentId,
        userBranch: branchName,
        activityName: options.activityName
      })
    }else{
      //未完善，等用户登录页面
    }

    this.setData({
      activityID: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})