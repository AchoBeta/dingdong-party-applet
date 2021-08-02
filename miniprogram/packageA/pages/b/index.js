// pages/nowStep/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: undefined,
    winHeight: app.globalData.windowHeight,
    saveView: 10,
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
    // if (!app.globalData.MODES) {
    //   let query = wx.createSelectorQuery()
    //   query.select("#finalBtn").boundingClientRect(function (rect) {
    //     console.log(rect)
    //     if (rect.top < that.data.winHeight - rect.height) {
    //       that.setData({
    //         saveView: that.data.winHeight - rect.height - rect.top
    //       })
    //     }
    //     if (rect.height == 0) {
    //       that.setData({
    //         saveView: '40r'
    //       })
    //     }
    //   }).exec()
    // }


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
    if (e.currentTarget.dataset.path) {
      wx.downloadFile({
        url: e.currentTarget.dataset.path,
        success(res) {
          wx.openDocument({
            filePath: res.tempFilePath,
          })
        }
      })
    }
    else {
      wx.cloud.downloadFile({
        fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/模板示例文件/入党申请人/入党申请书模板.doc',
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