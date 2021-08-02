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
    MODE:app.globalData.MODES,
    topKKK: app.globalData.screenHeight,
    textBack: undefined
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
    if (!app.globalData.MODES) {
      let query = wx.createSelectorQuery()
      query.select("#finalBtn").boundingClientRect(function (rect) {
        console.log(rect)
        if (rect.top < that.data.winHeight - rect.height) {
          that.setData({
            saveView: that.data.winHeight - rect.height - rect.top
          })
        }
        if (rect.height == 0) {
          that.setData({
            saveView: '40r'
          })
        }
      }).exec()
    }

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
    wx.showLoading({
      title: '加载中...',
    })
    let fileUrl = e.currentTarget.dataset.path
    console.log(e)
    if (fileUrl) {
      wx.cloud.downloadFile({
        fileID:fileUrl,
        success(res){
          wx.openDocument({
            filePath: res.tempFilePath,
          })
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
    }
    else {
      wx.cloud.downloadFile({
        fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20-入党申请人培养考察手册（参考样本）.pdf',
        success(res) {
          wx.openDocument({
            filePath: res.tempFilePath,
          })
        }
      })
    }
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