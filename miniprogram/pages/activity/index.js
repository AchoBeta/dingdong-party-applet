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
    activityList: [], //我的活动列表
    AllActivityList: [], //全部活动列表
    page: 2 //用于请求全部数据分页
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
        page: 2,
        AllActivityList: []
      })
      this.requestAllActivity(1);
    }
  },

  navToDetail(e) {
    //  console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.status == 3 || e.currentTarget.dataset.status == 4 || e.currentTarget.dataset.status == 6) {
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id + '&partStatus=' + e.currentTarget.dataset.partstatus,
      })
    } else if (e.currentTarget.dataset.status == 5 && this.data.TabIndex == 0) {
      wx.navigateTo({
        url: '../activityDetailFinish/index?id=' + e.currentTarget.dataset.id,
      })
    } else if (e.currentTarget.dataset.status == 5 && this.data.TabIndex == 1) {
      wx.navigateTo({
        url: '../activityDetail/index?id=' + e.currentTarget.dataset.id,
      })
    }
  },

  //请求与我相关的数据
  async requestMyActivity() {
    var that = this

    await app.getToken()//判断token是否过期
    var token = wx.getStorageSync('token')

    return new Promise((resolve, reject) => {
      var userID = wx.getStorageSync('userInfo').userId
      // console.log(userID)
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/' + userID + '/acitvities',
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'token': token
        },
        success(res) {
          if (res.data.message == "成功") {
            let activityList = res.data.data.items
            activityList.sort(that.compare1("status"))//升序排序

            for (var i = 0; i < res.data.data.items.length; i++) {
              activityList[i].startTime = res.data.data.items[i].startTime.substring(0, 10)
              activityList[i].endTime = res.data.data.items[i].endTime.substring(0, 10)
            }

            that.setData({
              activityList
            })
            resolve("成功")
          } else {
            wx.showToast({
              title: '请重新进入页面',
              icon: "loading"
            })
            reject("失败")
          }

          // console.log(res.data.data.items)
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
          size: "7"
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
    this.requestMyActivity();
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
  compareDate:function (property) {
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
    if (this.data.TabIndex == 1) {
      var page = this.data.page
      //调用接口返回新数据
      this.requestAllActivity(page).then(e => {
        if (e == "成功") {
          page = page + 1
          this.setData({
            page
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