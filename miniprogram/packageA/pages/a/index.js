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
    examine:undefined,
    topKKK: app.globalData.screenHeight,
    textBack: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.MODES){
      this.getExamine()
    }
    
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
      nowKey: app.globalData.nowKey,
      MODE:app.globalData.MODES
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
        if(patt1.test(res.tempFiles[0].name)){
          wx.uploadFile({
            url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/file/Material/1',
            filePath: res.tempFiles[0].path,
            name: 'file',
            header: {
              Authorization: wx.getStorageSync("Authorization")
            },  
            formData: { },
            success(rect){
              console.log(rect)
              wx.showModal({
                title:"提示",
                content:"提交成功，等待党支部审核，点击取消可以重选文件",
                success(res){
                  if(res.confirm){
                    wx.navigateBack({
                      complete: (res) => {},
                    })
                  }
                }
              })
              that.getExamine()
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '只能选择doc，docx文件',
          })
        }
      }
    })
  },
  previewFile(e) {
    if(e.currentTarget.dataset.path){
      let fileUrl = e.currentTarget.dataset.path
      wx.showLoading({
        title: '加载中...',
      })
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
    else{
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
  getExamine(e){
    const that = this
    try {
      wx.request({
        url: 'https://www.dingdongtongxue.com/Party/public/index.php/client/v1/file/Material/1',
        method: "GET",
        header: {
          Authorization: wx.getStorageSync("Authorization")
        },
        success(res){
          console.log(res)
        },
        complete(res) {
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