// pages/test/index.js

const app = getApp()
const {
  getAllActivity,
  getRelatedActivity,
  getMyActivity,
  getActivityDetail,
  getActivityPeopleNum,
  applyParticipation,
  FirstPublishExperience,
  updateExperience,
  getComments,
  applyForLeave,

  getBranches,
  getGroups,
  getInfo,
  getStage,
  getAllStage,
  queryGroup,
  getGrade,
  getMaxStage

} = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : wx.getStorageSync('userInfo'),
    grade : []
  },


  getNowDate() {
    var timeStamp =  Date.parse(new Date())
    var date = new Date(timeStamp)
    var year = date.getFullYear()
    var list = this.data.grade
    console.log(year)
    for(let i = 0; i < 4; i++){
      list.push(year)
      year--
    }
  },
    //查看自己信息
    async showUserInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/info',
        method: 'GET',
        header: {
          'token': token
        },
        success(res) {
          console.log(res)
        }
      })
    },
    //获取用户信息
    async StudentInfo() {
      var userInfo = this.data.userInfo
      var userId = userInfo.userId
      var studentId = userInfo.studentId
      getInfo(userId).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    async Stage(){
      var id = this.data.userInfo.stageId
      console.log(id)
      getStage(id).then(res => {
        console.log(res.data.data.item.name)
        this.setData({
          keyName : res.data.data.item.name
        })
      }).catch(err => {
        console.log(err)
      })
    },

    async Grade() {
      var list = []
      getGrade().then(res => {
        // console.log(res.data.data.num)
        var maxGrade = res.data.data.num
        for (let i = 0; i < 4; i++) {
          var name = maxGrade + ""
          list.push({
            name
          })
          maxGrade--
        }
        console.log(list)
      }).catch(err => {
        console.log(err)
      })
    },

    async maxBatch() {
      var list = this.data.batchList
      getMaxStage().then(res => {
        // console.log(res.data.data)
        var maxBatch = res.data.data.num
        for(let i = 0; i < maxBatch; i++){
          var name = "第" + (i + 1) + "期"
          // console.log(name)
          list.push({
            name
          })
        }
        console.log(list)
      }).catch(err => {
        console.log(err)
      })
    },
    //创建用户
    async updateUserInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      // var studentId = wx.getStorageSync('userInfo').studentId
  
      var userInfo = {
        "birthday": "",
        "branchId": "",
        "branchName": "",
        "className": "",
        "classPosition": "",
        "dormitoryArea": "",
        "dormitoryNo": "",
        "familyAddress": "",
        "gender": true,
        "grade": 0,
        "groupId": "",
        "groupName": "",
        "idCard": "",
        "institute": "",
        "joinLeagueTime": "",
        "major": "",
        "name": "asd",
        "nation": "",
        "origin": "",
        "phone": "",
        "stage": 0,
        "stageId": 0,
        "studentId": "201943362335",
        "taskId": 0
      }
  
      wx.request({
        url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users',
        method: 'PUT',
        data: userInfo,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success(res) {
          console.log(res)
        }
      })
    },
    //查询所有党组
    async Groups(branchId) {
      var that = this
      var params = {
        page: 1,
        size: 20
      }
      getGroups(branchId, params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    //查询所有党支部
    async Branches() {
      var that = this
      var params = {
        page: 1,
        size: 20
      }
      getBranches(params).then(res=>{
        console.log(res.data.data.list)
      }).catch(err=>{
        console.log(err)
      })
    },
    //修改学生信息
    async updateStudentInfo() {
      await app.getToken() //判断token是否过期
      var token = wx.getStorageSync('token')
      var studentId = wx.getStorageSync('userInfo').studentId
  
      var studentEntity = {
        "birthday": "",
        "branchId": "",
        "branchName": "",
        "className": "",
        "classPosition": "",
        "dormitoryArea": "",
        "dormitoryNo": "",
        "familyAddress": "",
        "gender": true,
        "grade": 0,
        "groupId": "",
        "groupName": "",
        "idCard": "",
        "institute": "",
        "joinLeagueTime": "",
        "major": "",
        "name": "asd",
        "nation": "",
        "origin": "",
        "phone": "",
        "stage": 0,
        "stageId": 0,
        "studentId": studentId,
        "taskId": 0
      }
    },
  //查看自己信息
  async showUserInfo() {
    await app.getToken() //判断token是否过期
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users/info',
      method: 'GET',
      header: {
        'token': token
      },
      success(res) {
        console.log(res)
      }
    })
  },

  //创建用户
  async updateUserInfo() {
    await app.getToken() //判断token是否过期
    var token = wx.getStorageSync('token')
    // var studentId = wx.getStorageSync('userInfo').studentId

    var userInfo = {
      "birthday": "",
      "branchId": "",
      "branchName": "",
      "className": "",
      "classPosition": "",
      "dormitoryArea": "",
      "dormitoryNo": "",
      "familyAddress": "",
      "gender": true,
      "grade": 0,
      "groupId": "",
      "groupName": "",
      "idCard": "",
      "institute": "",
      "joinLeagueTime": "",
      "major": "",
      "name": "asd",
      "nation": "",
      "origin": "",
      "phone": "",
      "stage": 0,
      "stageId": 0,
      "studentId": "201943362335",
      "taskId": 0
    }

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/users',
      method: 'PUT',
      data: userInfo,
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success(res) {
        console.log(res)
      }
    })
  },

  //修改学生信息
  async updateStudentInfo() {
    await app.getToken() //判断token是否过期
    var token = wx.getStorageSync('token')
    var studentId = wx.getStorageSync('userInfo').studentId

    var studentEntity = {
      "birthday": "",
      "branchId": "",
      "branchName": "",
      "className": "",
      "classPosition": "",
      "dormitoryArea": "",
      "dormitoryNo": "",
      "familyAddress": "",
      "gender": true,
      "grade": 0,
      "groupId": "",
      "groupName": "",
      "idCard": "",
      "institute": "",
      "joinLeagueTime": "",
      "major": "",
      "name": "asd",
      "nation": "",
      "origin": "",
      "phone": "",
      "stage": 0,
      "stageId": 0,
      "studentId": studentId,
      "taskId": 0
    }

    wx.request({
      url: app.globalData.APIUrlHead + '/api/dingdong-party/v1/base/students/' + studentId,
      method: 'PUT',
      data: studentEntity,
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success(res) {
        console.log(res)

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var id = 1
    // console.log(options)
    // this.Groups(1)
    // this.Branches()
    // app.getOpenId()
    // app.getToken()
    // this.StudentInfo()
    // this.Stage()
    this.Grade()
    this.maxBatch()
    // this.getNowDate()
    // getAllActivity({page:1,size:5}).then(res=>{
    //   console.log(res)
    // })
    // getRelatedActivity({branchId:1,page:1,size:5}).then(res=>{
    //   console.log(res)
    // })
    // getMyActivity("1425629310860935169").then(res=>{
    //   console.log(res)
    // })
    // getActivityDetail("1419572434029355010").then(res => {
    //   console.log(res)
    // })
    // getActivityPeopleNum("1419572434029355010").then(res => {
    //   console.log(res)
    // })
    // applyParticipation("1425629310860935169","1419572434029355010").then(res => {
    //   console.log(res)
    // })
    var comment = {
      activityId: "1419572434029355010",
      content: "gx封装心得评论",
      id: "",
      image: "",
      userId: "1425629310860935169"
    }
    // FirstPublishExperience("1419572434029355010",comment).then(res=>{
    //   console.log(res)
    // })
    // updateExperience("1419572434029355010", "1426480504579829762", comment).then(res => {
    //   console.log(res)
    // })
    // getComments("1419572434029355010", {page:1,size:5}).then(res => {
    //   console.log(res)
    // })
    // applyForLeave("1419162725304542567", "1423870335597969136", "reason封装002").then(res => {
    //   console.log(res)
    // })
    // var branchId = wx.getStorageSync('userInfo').branchId
    // console.log(branchId)
    // queryGroup(branchId, {
    //   page: 1,
    //   size: 100
    // }).then(res => {
    //   console.log(res)
    // })
    // app.getToken();
    // var data = {
    //   page:1,
    //   size:100
    // }
    // wx.request({
    //   url: "https://www.dingdongtongxue.com/api/dingdong-party/base/branch/"+3+"/groups",
    //   method:"GET",
    //   data,
    //   header:{
    //     'content-type': "application/json",
    //     'token': "3821-7751"
    //   },
    //   success(res){
    //     console.log(res)
    //   }
    // })
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