// pages/activityDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    activity: {},
    partStatus: null //请假状态
  },

  topBack(e) {
    wx.navigateBack({})
    // console.log("asd")
  },

  navToleave(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../leave/index?id=' + e.currentTarget.dataset.id+'&activityName='+e.currentTarget.dataset.activityname,
    })
  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  publishExperience() {
    console.log(this.data.textareaAValue)
  },

  //申请参与活动
  async applyParticipation() {
    var activityId = this.data.activityID
    // var activityId = ""
    var userId = wx.getStorageSync('userInfo').userId

    if (activityId == null) {
      wx.showToast({
        title: '请从活动详情页重新进入此页面',
        icon: "none"
      })
    } else {
      await app.getToken()//判断token是否过期
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + activityId + '/users/' + userId + '/participate',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'token': token
        },
        success(res) {
          if (res.data.message == "成功") {
            wx.showToast({
              title: '提交成功',
            })
            setTimeout(res=>{
              wx.navigateBack({
                delta: 1,
              })
            },1500)
          } else {
            wx.showToast({
              title: '提交失败',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.partStatus)
    this.requestActivity(options.id)
    this.requestNumOfPeople(options.id)

    this.setData({
      partStatus: options.partStatus,
      activityID: options.id
    })
  },

  //根据id请求活动详情数据
  async requestActivity(id) {
    var that = this
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        if (res.data.message == "成功") {
          that.setData({
            activity: res.data.data.item
          })
        }else{
          wx.showToast({
            title: '请重新加入页面',
            icon: "loading"
          })
        }
        // console.log(res)
      }
    })
  },

  //获取活动人数
  async requestNumOfPeople(id){
    var that = this
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/'+id+'/users',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        that.setData({
          NumOfPeople : res.data.data.items.length
        })
        // console.log(res)
      }
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