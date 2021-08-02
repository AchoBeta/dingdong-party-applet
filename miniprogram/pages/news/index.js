// pages/news/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/newSwiper/0.png',
      src: undefined
    }, {
      id: 1,
      type: 'image',
      url: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/newSwiper/2.png',
      src: "https://ddh.dgut.edu.cn/"
    }, {
      id: 2,
      type: 'image',
      url: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/newSwiper/3.png',
      src: "https://xfw.dgut.edu.cn/zt/lxyzzt.htm"
    }, {
      id: 3,
      type: 'image',
      url: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/newSwiper/4.png',
      src: "https://xfw.dgut.edu.cn/zt/ztjy.htm"
    }, {
      id: 4,
      type: 'image',
      url: 'cloud://partybuilding-ap3rs.7061-partybuilding-ap3rs-1301916504/newSwiper/5.png',
      src: "https://xfw.dgut.edu.cn/zt/sysszt.htm"
    }],
    topLLL: app.globalData.StatusBar,
    topKKK: app.globalData.screenHeight
  },
  swiperImg:function(e){
    let src = e.currentTarget.dataset.src
    // if(src){
    //   wx.navigateTo({
    //     url: '../newsWeb/index?src=' + src,
    //   })
    // }
  }
  
})