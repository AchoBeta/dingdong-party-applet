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
    examine: undefined,
    MODE:app.globalData.MODES,
    topKKK: app.globalData.screenHeight,
    textBack: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamine()
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
      type: 'file',
      success(res) {
        that.setData({
          fileList: res.tempFiles
        })
        let patt1 = new RegExp(".doc$|.docx$");
        if (patt1.test(res.tempFiles[0].name)) {
          wx.uploadFile({
            url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/file/Material/22',
            filePath: res.tempFiles[0].path,
            name: 'file',
            header: {
              Authorization: wx.getStorageSync("Authorization")
            },
            formData: { },
            success(rect) {
              console.log(rect)
              that.getExamine()
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '只能选择doc，docx文件',
          })
        }
      }
    })
  },
  uploadStorage(e) {
    // const FileSystemManager = wx.getFileSystemManager()
    // FileSystemManager.getSavedFileList({
    //   success:res=>{
    //     console.log(e)
    //   }
    // })
    wx.chooseMedia({

    })
  },
  previewFile(e) {
    wx.showLoading({
      title: '加载中...',
    })
    let fileUrl = e.currentTarget.dataset.path
    if (fileUrl) {
      wx.cloud.downloadFile({
        fileID: fileUrl,
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
    else {
      wx.cloud.downloadFile({
        fileID: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/20-入党申请人培养考察手册（参考样本）.pdf',
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
  getExamine(e) {
    const that = this
    try {
      wx.request({
        url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/file/Material/18',
        method: "GET",
        header: {
          Authorization: wx.getStorageSync("Authorization")
        },
        complete(res) {
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
          that.setData({
            examine: res.data.msg
          })
        }
      })
    } catch (e) {

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