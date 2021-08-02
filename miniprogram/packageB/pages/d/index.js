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
    wx.showLoading({
      title: '获取文件中..',
    })
    wx.request({
      url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/user/Note/Info/11',
      method:"GET",
      header:{
        Authorization:wx.getStorageSync('Authorization')
      },
      success(res){
        console.log(res)
      },
      fail(res){
        wx.showModal({
          title:"提示",
          content:"网络错误，请重新进入"
        })
      },
      complete(res){
        wx.hideLoading()
      }
    })
  },
  onReady(){
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
  backNav(e) {
    wx.navigateBack({})
  },
  previewFile(e) {
    console.log(e)
    if (e.currentTarget.dataset.path) {
      /** 取消下列方法 */
      wx.openDocument({
        filePath: e.currentTarget.dataset.path,
      })
      /** ---- */
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