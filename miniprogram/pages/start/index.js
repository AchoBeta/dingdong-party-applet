// miniprogram/pages/start/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer: '',
        countDownNum: '3'
    },

    toHome: function(e) {
        var that = this;
        wx:wx.switchTab({
          url: '../news/index',
        })
        clearInterval(that.data.timer)
    },

    toStage: function(e) {
        var that = this;
        wx:wx.switchTab({
          url: '../index/index',
        })
        clearInterval(that.data.timer)
    },

    countDown: function() {
        let that = this;
        let countDownNum = that.data.countDownNum;
        that.data.timer = setInterval(function () {
            if (countDownNum == 0){
                wx:wx.switchTab({
                  url: '../news/index',
                })
                clearInterval(that.data.timer);
            } else {
                countDownNum--;
                that.setData({
                    countDownNum: countDownNum
                })
            }
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.countDown()
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