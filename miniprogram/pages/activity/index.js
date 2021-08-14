// pages/activity/index.js\
const app = getApp()
const {
  getAllActivity,
  getRelatedActivity,
  getMyActivity,
} = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    Tab: [{
      name: "我的活动",
      id: 0,
      isActive: true
    }, {
      name: "与我相关",
      id: 1,
      isActive: false
    }, {
      name: "全部活动",
      id: 2,
      isActive: false
    }],
    TabIndex: 0,
    MyActivityList: [], //我的活动列表
    RelatedActivityList: [], //与我相关活动列表
    AllActivityList: [], //全部活动列表
    RelatedPage: 2,
    AllPage: 2, //用于请求全部数据分页
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
      this.setData({
        RelatedPage: 2,
        RelatedActivityList: []
      })
      this.requestRelatedActivity(1);
    } else if (e.currentTarget.dataset.index == 2) {
      this.setData({
        AllPage: 2,
        AllActivityList: []
      })
      this.requestAllActivity(1);
    }
  },

  navToDetail(e) {
    //  console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.status == 3 || e.currentTarget.dataset.status == 4) {
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id + '&partStatus=' + e.currentTarget.dataset.partstatus,
      })
    } else if (e.currentTarget.dataset.status == 5 && this.data.TabIndex == 0) {
      wx.navigateTo({
        url: '../activityDetailFinish/index?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.status == 5 && this.data.TabIndex == 2) {
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.status == 6) {
      // console.log(e.currentTarget.dataset.TabIndex)
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id + '&partStatus=' + e.currentTarget.dataset.partstatus + '&TabIndex=' + e.currentTarget.dataset.tabindex,
      })
    }
  },

  //获取我的活动的数据
  async MyActivity() {
    var that = this
    return new Promise((resolve, reject) => {
      // await app.getToken() //判断token是否过期
      var userId = wx.getStorageSync('userInfo').userId

      getMyActivity(userId).then(res => {
        // console.log(res)
        let MyActivityList = res.data.data.items
        MyActivityList.sort(that.compare1("status")) //升序排序

        for (var i = 0; i < res.data.data.items.length; i++) {
          MyActivityList[i].startTime = res.data.data.items[i].startTime.substring(0, 10)
          MyActivityList[i].endTime = res.data.data.items[i].endTime.substring(0, 10)
        }
        that.setData({
          MyActivityList
        })
        resolve("成功")
      }).catch(err => {
        reject("失败")
      })
    })
  },

  //请求与我相关的活动数据
  async requestRelatedActivity(page) {
    var that = this
    await app.getToken()
    var token = wx.getStorageSync('token')
    var branchId = wx.getStorageSync('userInfo').branchId
    var groupId = wx.getStorageSync('userInfo').groupId

    return new Promise((resolve, reject) => {
      var RelatedActivityList = []
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities',
        method: 'GET',
        data: {
          branchId: branchId,
          page: page,
          size: "10"
        },
        header: {
          'content-type': 'application/json',
          'token': token
        },
        success(res) {
          // console.log(res)
          if (res.data.message == "成功") {
            RelatedActivityList = that.data.RelatedActivityList
            let newList = res.data.data.list.items;
            for (var i = 0; i < res.data.data.list.items.length; i++) {
              newList[i].startTime = res.data.data.list.items[i].startTime.substring(0, 10);
              newList[i].endTime = res.data.data.list.items[i].endTime.substring(0, 10);
            }
            // AllActivityList=AllActivityList.concat(newList)
            if (newList.length != 0) {
              that.setData({
                RelatedActivityList: [...RelatedActivityList, ...newList] //拼接两个数组
              });
            }
            resolve("成功");
          } else {
            wx.showToast({
              title: '请重新进入页面',
              icon: "loading"
            });
            reject("失败");
          }
          // console.log(res.data.data.list.items)
        }
      })

      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities',
        method: 'GET',
        data: {
          groupId: groupId,
          page: page,
          size: "10"
        },
        header: {
          'content-type': 'application/json', // 默认值
          'token': token
        },
        success(res) {
          // console.log(res)
          if (res.data.message == "成功") {
            RelatedActivityList = that.data.RelatedActivityList
            let newList = res.data.data.list.items
            for (var i = 0; i < res.data.data.list.items.length; i++) {
              newList[i].startTime = res.data.data.list.items[i].startTime.substring(0, 10)
              newList[i].endTime = res.data.data.list.items[i].endTime.substring(0, 10)
            }
            // AllActivityList=AllActivityList.concat(newList)
            if (newList.length != 0) {
              that.setData({
                RelatedActivityList: [...RelatedActivityList, ...newList] //拼接两个数组
              })
            }
            resolve("成功")
          } else {
            wx.showToast({
              title: '请重新进入页面',
              icon: "loading"
            })
            reject("失败")
          }
          // console.log(res.data.data.list.items)
        }
      })
    })
  },

  //请求全部数据
  async requestAllActivity(page) {
    var that = this
    await app.getToken()
    var token = wx.getStorageSync('token')

    return new Promise((resolve, reject) => {
      var AllActivityList = that.data.AllActivityList
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/organization/activities/all',
        method: 'GET',
        data: {
          page: page,
          size: "10"
        },
        header: {
          'content-type': 'application/json', // 默认值
          'token': token
        },
        success(res) {
          // console.log(res)
          if (res.data.message == "成功") {
            let newList = res.data.data.list.items
            for (var i = 0; i < res.data.data.list.items.length; i++) {
              newList[i].startTime = res.data.data.list.items[i].startTime.substring(0, 10)
              newList[i].endTime = res.data.data.list.items[i].endTime.substring(0, 10)
            }
            // AllActivityList=AllActivityList.concat(newList)
            if (newList.length != 0) {
              that.setData({
                AllActivityList: [...AllActivityList, ...newList] //拼接两个数组
              })
              // AllActivityList.sort(that.compare1("startTime")) //按时间排序
            }
            resolve("成功")
          } else {
            wx.showToast({
              title: '请重新进入页面',
              icon: "loading"
            })
            reject("失败")
          }
          // console.log(res.data.data.list.items)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.MyActivity();
    // app.getOpenId()
    // app.getToken()
  },

  //比较器，根据对象的property属性进行升序排序
  compare1: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },

  //比较器，根据对象的property属性进行降序排序
  compare2: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  //日期类型数据比较器，根据对象的日期数据进行降序排序
  compareDate: function (property) {
    return function (a, b) {
      var value1 = Date.parse(a[property]);
      var value2 = Date.parse(b[property]);
      return value2 - value1;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.TabIndex == 0) {
      this.requestMyActivity().then(e => {
        if (e == "成功") {
          wx.stopPullDownRefresh();
        }
      })
    } else if (this.data.TabIndex == 1) {
      this.requestRelatedActivity(1).then(e => {
        if (e == "成功") {
          wx.stopPullDownRefresh();
        }
      })
    } else if (this.data.TabIndex == 2) {
      this.requestAllActivity(1).then(e => {
        if (e == "成功") {
          wx.stopPullDownRefresh();
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //可优化：没数据返回就不允许请求了
    if (this.data.TabIndex == 2) {
      var AllPage = this.data.AllPage
      //调用接口返回新数据
      this.requestAllActivity(AllPage).then(e => {
        if (e == "成功") {
          AllPage = AllPage + 1
          this.setData({
            AllPage
          })
        }
      })
    } else if (this.data.TabIndex == 1) {
      var RelatedPage = this.data.RelatedPage
      //调用接口返回新数据
      this.requestRelatedActivity(RelatedPage).then(e => {
        if (e == "成功") {
          RelatedPage = RelatedPage + 1
          this.setData({
            RelatedPage
          })
        }
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})