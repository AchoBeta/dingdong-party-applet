// pages/activity/index.js\
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    Tab: [{
      name: "与我相关",
      id: 0,
      isActive: true
    }, {
      name: "全部活动",
      id: 1,
      isActive: false
    }],
    TabIndex: 0,
    activityList: []
  },

  handleItemChange(e) {
    let index = e.currentTarget.dataset.index
    let {
      Tab
    } = this.data;
    Tab.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      Tab,
      TabIndex: index
    })

    // console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 0) {
      this.requestMyActivity();
    } else if (e.currentTarget.dataset.index == 1) {
      this.requestAllActivity();
    }
  },

  navToDetail(e) {
    //  console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.status == 3 || e.currentTarget.dataset.status == 4 || e.currentTarget.dataset.status == 6) {
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id + '&partStatus='+e.currentTarget.dataset.partstatus,
      })
    }
    else if(e.currentTarget.dataset.status == 5){
      wx.navigateTo({
        url: '../activityDetailFinish/index?id=' + e.currentTarget.dataset.id,
      })
    }
  },

  requestMyActivity() {
    var that = this
    var userID = "1"
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/' + userID + '/acitvities',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': '2112-9473'
      },
      success(res) {
        // 
        let activityList = res.data.data.items
        for (var i = 0; i < res.data.data.items.length; i++) {
          activityList[i].startTime = res.data.data.items[i].startTime.substring(0, 10)
          activityList[i].endTime = res.data.data.items[i].endTime.substring(0, 10)
        }
        that.setData({
          activityList
        })
        console.log(res)
      }
    })
  },

  requestAllActivity() {
    var that = this
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/all',
      method: 'GET',
      data: {
        page: "1",
        size: "10"
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': '0563-8945'
      },
      success(res) {
        let activityList = res.data.data.list.items
        for (var i = 0; i < res.data.data.list.items.length; i++) {
          activityList[i].startTime = res.data.data.list.items[i].startTime.substring(0, 10)
          activityList[i].endTime = res.data.data.list.items[i].endTime.substring(0, 10)
        }
        that.setData({
          activityList
        })
        console.log(res.data.data.list.items)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestMyActivity();
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