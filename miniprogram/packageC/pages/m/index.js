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
    url:undefined,
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
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/fileLink/application',
      method:"GET",
      header:{
        Authorization:wx.getStorageSync('Authorization')
      },
      success(res){
        console.log(res)
        that.setData({
          url:res.data.url
        })
      },fail(res){
        wx.showModal({
          title:"提示",
          content:"网络错误，请重试"
        })
      },complete(res){
        wx.hideLoading()
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
  previewFile(e) {
    const that = this
    console.log(e)
    wx.showLoading({
      title: '下载中..',
    })
    if (e.currentTarget.dataset.path) {
      
      wx.downloadFile({
        url: e.currentTarget.dataset.path,
        success(res){
          wx.openDocument({
            filePath: res.tempFilePath,
          })
        },
        fail(res){
          wx.showModal({
            title:"提示",
            content:"网络错误，请重试"
          })
        },
        complete(res){
          wx.hideLoading()
        }
      })
    }
    else {
      wx.cloud.downloadFile({
        fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/模拟数据/中国共产党入党志愿书（部分）.doc',
        success(res) {
          wx.openDocument({
            filePath: res.tempFilePath,
          })
          wx.hideLoading({
            success: (res) => {},
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