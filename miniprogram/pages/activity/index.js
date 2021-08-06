// pages/activity/index.js\
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight,
    Tab:[{
      name:"与我相关",
      id:0,
      isActive:true
    },{
      name:"全部活动",
      id:1,
      isActive:false
    }],
    jobList: [
      {
        id: "1",
        imgUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F56%2F20%2F59fb45973ff29_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630751946&t=2ad34a0a7bc5cf2ed94f36e44e71c3be",
        name: "活动001",
        companyName: "党支部名称",
        createTime:"09月29日"
      },
      {
        id: "2",
        imgUrl: "https://img1.baidu.com/it/u=3347598173,1161261498&fm=26&fmt=auto&gp=0.jpg",
        name: "活动002",
        companyName: "党支部名称",
        createTime:"09月29日"
      }, {
        id: "3",
        imgUrl: "https://img1.baidu.com/it/u=111840872,3448845299&fm=26&fmt=auto&gp=0.jpg",
        name: "活动003",
        companyName: "党支部名称",
        createTime:"09月29日"
      }
    ]
  },

  handleItemChange(e) {
    let index = e.currentTarget.dataset.index
    let {
      Tab
    } = this.data;
    Tab.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      // currentItemIndex: index,
      Tab
    })
  },

  navToDetail(e){
    wx.navigateTo({
      url: '../activityDetail/index?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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