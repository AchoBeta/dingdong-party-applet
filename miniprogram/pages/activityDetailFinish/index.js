// pages/activityDetailFinish/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    commentList: [],
    updateExperience: false,
    myCommentId: "",
  },

  topBack(e) {
    wx.navigateBack({})
    // console.log("asd")
  },

  navToleave(e) {
    wx.navigateTo({
      url: '../leave/index',
    })
  },

  // showModal(e) {
  //   this.setData({
  //     modalName: e.currentTarget.dataset.target
  //   })
  // },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  writeExperience(e) { //显示心得弹出层
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },

  //首次提交心得评论
  async publishExperience() {
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')

    // console.log(this.data.textareaValue)
    var id = this.data.activityId
    var that = this

    var userId = wx.getStorageSync('userInfo').userId

    var comment = {
      activityId: this.data.activityId,
      content: this.data.textareaValue,
      id: "",
      image: "",
      userId: userId
    }

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + id + '/comments',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        // 'contentType' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'token': token
      },
      data: comment,
      success(res) {
        if (res.data.message == "成功") {
          wx.showToast({
            title: '发布成功',
          })
          that.hideModal()
          that.requestComment(that.data.activityId)
        } else {
          wx.showToast({
            title: '请重新提交',
          })
        }
        // console.log(res.data)
      }
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

        } else {
          wx.showToast({
            title: '请重新加入页面',
            icon: "loading"
          })
        }
      }
    })
  },

  //根据id查询活动人数
  async requestNumOfPeople(id) {
    var that = this
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + id + '/users',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        that.setData({
          NumOfPeople: res.data.data.items.length
        })
        // console.log(res)
      }
    })
  },

  //查询所有心得评论
  async requestComment(id) {
    var that = this
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + id + '/comments',
      method: 'GET',
      data: {
        page: 1,
        size: 20
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        if (res.data.message == "成功") {
          that.setData({
            commentList: res.data.data.list.items
          })
          that.checkUpdateExperience()
        } else {
          wx.showToast({
            title: '请重新加入页面',
            icon: "loading"
          })
        }
      }
    })
  },

  //判断是否已发布过心得，再使用更新心得功能
  checkUpdateExperience() {
    let commentList = this.data.commentList
    var userId = wx.getStorageSync('userInfo').userId
    let updateExperience = commentList.some(v => {
      return v.userId == userId
    })
    let myCommentId = ""
    let textareaValue = ""

    for (let i = 0; i < commentList.length; i++) {
      if (commentList[i].userId == userId) {
        myCommentId = commentList[i].id
        textareaValue = commentList[i].content
        // console.log(myCommentId)
        break
      }
    }
    // console.log(updateExperience)
    this.setData({
      updateExperience,
      myCommentId,
      textareaValue
    })
  },

  //更新心得
  async updateExperience() {  
    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')

    var commentId = this.data.myCommentId
    var activityId = this.data.activityId

    var that = this

    var comment = {
      // activityId: this.data.activityId,
      // content: this.data.textareaValue,
      activityId: activityId,
      content: this.data.textareaValue,
      id: commentId,
      image: "",
      userId: userId
    }

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/' + activityId + '/comments/' + commentId,
      method: 'PUT',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        // 'contentType' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'token': token
      },
      data: comment,
      success(res) {
        // console.log(res)
        if (res.data.message == "成功") {
          wx.showToast({
            title: '更新成功',
          })
          that.hideModal()
          that.requestComment(that.data.activityId)
        } else {
          wx.showToast({
            title: '请重新提交',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.id
    })
    // console.log(options.id)
    this.requestActivity(options.id)
    this.requestNumOfPeople(options.id)
    this.requestComment(options.id)

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