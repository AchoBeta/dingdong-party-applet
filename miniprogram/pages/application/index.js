// pages/application/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getOpensourceFile(e){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/叮咚党建开源公告.pdf',
      success(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.openDocument({
          filePath: res.tempFilePath,
        })
      }
    })
  },
  toBack(){
    wx.navigateBack({})
  }
})