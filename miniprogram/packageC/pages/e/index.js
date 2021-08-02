// pages/nowStep/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: undefined,
    winHeight: app.globalData.windowHeight,
    saveView: 0,
    score:undefined,
    MODE:app.globalData.MODES,
    topKKK: app.globalData.screenHeight,
    textBack: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.showLoading({
      title: '数据加载中..',
    })
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/score/second',
      method:"GET",
      header:{Authorization:wx.getStorageSync('Authorization')},
      success(res){
        console.log(res)
        that.setData({
          score:res.data
        })
      },
      fail(res){
        console.log(res)
      },
      complete(res){
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
    wx.createSelectorQuery().select('#the-textView').boundingClientRect(function(rect){
        let height = rect.height  // 节点的高度
        that.setData({
          textBack: height
        })
      }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this
    that.setData({
      fileList: app.globalData.fileList,
      nowStep: app.globalData.nowStep,
      nowKey: app.globalData.nowKey
    })

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
  backNav(e) {
    wx.navigateBack({})
  },
  uploadWeixin(e) {
    const that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        app.globalData.fileList = res.tempFiles
        that.setData({
          fileList: res.tempFiles
        })
      }
    })
  },
  previewFile(e) {
    console.log(e)
    wx.cloud.downloadFile({
      fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20-入党申请人培养考察手册（参考样本）.pdf',
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath,
        })
      }
    })
  },
  toUpForm(e) {
    wx.showModal({
      title: '提示',
      content: '是否进入下一步',
      cancelText: '再想想',
      success(res) {
        if (res.confirm) {
          wx.navigateBack({})
          app.globalData.nowStep += 1
          wx.showToast({
            title: '发送成功',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})