const baseUrl = 'https://api.dingdongtongxue.com/dingdong-party'

function request(url, data = {}, content_type = 'application/json', method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header: {
        'content-type': content_type,
        'token': wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
      },
      success(res) {
        if (Math.floor(res.statusCode / 100) === 2) {
          if(Math.floor(res.data.code / 100) === 2){
            resolve(res)
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'error'
            })
            reject(res)
          }
        } else if (Math.floor(res.statusCode / 100) === 4 || Math.floor(res.statusCode / 100) === 5) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          reject({
            code: data.code,
            url: url,
            message: data.message
          })
        } else {
          wx.showToast({
            title: '未知错误：' + res.statusCode,
            icon: 'none'
          })
          reject({
            code: res.statusCode,
            url: url,
            message: res.errMsg
          })
        }
      },
      fail() {
        wx.showToast({
          title: '接口请求错误',
          icon: 'none'
        })
        reject('接口请求错误')
      }
    })
  })
}

module.exports = {
  request: request
}