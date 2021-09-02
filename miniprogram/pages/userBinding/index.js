// miniprogram/pages/userBinding/index.js
const app = getApp();
const {
  bindStudent,
  bindTeacher,
  getBranches,
  getGroups,
  getInfo,
  getStudentInfo,
  getTeacherInfo,
} = require("../../utils/api.js")
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: [{
        title: '正在审核',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '审核失败',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '审核通过',
        name: 'green',
        color: '#39b54a'
      },
    ],
    userInfo: wx.getStorageSync('userInfo'),
    index: null,
    buttonText: "完成绑定",
    genderIndex: 0,
    genderList: ['女', '男'],
    picker: ['学生', '教师'],
    branchIndex: 0,
    instituteIndex: 0,
    instituteList: [{
        name: '学生社区知行学院'
      },
      {
        name: '网络空间安全学院'
      },
      {
        name: '继续教育学院'
      },
      {
        name: '马克思主义学院'
      },
      {
        name: '中法联合学院'
      },
      {
        name: '化学工程与能源技术学院'
      },
      {
        name: '教育学院（师范学院）'
      },
      {
        name: '法律与社会工作学院（知识产权学院）'
      },
      {
        name: '文学与传媒学院'
      },
      {
        name: '经济与管理学院'
      },
      {
        name: '机械工程学院'
      },
      {
        name: '生态环境与建筑工程学院'
      },
      {
        name: '电子工程与智能化学院'
      },
      {
        name: '计算机科学与技术学院'
      },
      {
        name: '国际学院'
      },
      {
        name: '粤台产业科技学院'
      },
      {
        name: '材料科学与工程学院'
      }
    ],
    dormitoryAreaIndex: 0,
    dormitoryAreaList: [{
        name: "莞馨社区"
      },
      {
        name: "莞雅社区"
      },
      {
        name: "莞逸社区"
      },
      {
        name: "莞博社区"
      },
      {
        name: "莞华社区"
      },
      {
        name: "莞思社区"
      },
      {
        name: "莞和社区"
      },
    ],
    groupIndex: 0,
    groupNameList: [],
    branchNameList: [],
    gradeIndex: 0,
    gradeList: [],
    birthday: "2000-01-01", //出生日期
    branchId: "", //党委ID
    branchName: "", //党委名称
    className: "", //班级
    classPosition: "", //班级职务
    dormitoryArea: "", //社区
    dormitoryNo: "", //宿舍号
    email: "", //邮箱
    familyAddress: "", //家庭住址
    gender: "", //性别（男1女0）
    grade: 0, //年级
    groupId: "", //党支部id
    groupName: "", //党支部名称
    idCard: "", //身份证号
    institute: "", //学院
    joinLeagueTime: "", //入团时间
    major: "", //专业
    name: "", //姓名
    nation: "", //民族
    origin: "", //籍贯
    openId: "", //微信openid
    partyAge: 0, //
    phone: "", //手机号
    stage: 0, //期数
    stageId: 0, //所属阶段
    status: 0, //审核状态（1通过2不通过）
    statusReason: "", //不通过原因
    studentId: "", //学号
    teacherId: "", //工号
    taskId: 0, //阶段任务
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    nationIndex: 0,
    nationArray: [{
        id: '0',
        name: '汉族'
      },
      {
        id: '1',
        name: '蒙古族'
      },
      {
        id: '2',
        name: '满族'
      },
      {
        id: '3',
        name: '朝鲜族'
      },
      {
        id: '4',
        name: '赫哲族'
      },
      {
        id: '5',
        name: '达斡尔族'
      },
      {
        id: '6',
        name: '鄂温克族'
      },
      {
        id: '7',
        name: '鄂伦春族'
      },
      {
        id: '8',
        name: '回族'
      },
      {
        id: '9',
        name: '东乡族'
      },
      {
        id: '10',
        name: '土族'
      },
      {
        id: '11',
        name: '撒拉族'
      },
      {
        id: '12',
        name: '保安族'
      },
      {
        id: '13',
        name: '裕固族'
      },
      {
        id: '14',
        name: '维吾尔族'
      },
      {
        id: '15',
        name: '哈萨克族'
      },
      {
        id: '16',
        name: '柯尔克孜族'
      },
      {
        id: '17',
        name: '锡伯族'
      },
      {
        id: '18',
        name: '塔吉克族'
      },
      {
        id: '19',
        name: '乌孜别克族'
      },
      {
        id: '20',
        name: '俄罗斯族'
      },
      {
        id: '21',
        name: '塔塔尔族'
      },
      {
        id: '22',
        name: '藏族'
      },
      {
        id: '23',
        name: '门巴族'
      },
      {
        id: '24',
        name: '珞巴族'
      },
      {
        id: '25',
        name: '羌族'
      },
      {
        id: '26',
        name: '彝族'
      },
      {
        id: '27',
        name: '白族'
      },
      {
        id: '28',
        name: '哈尼族'
      },
      {
        id: '29',
        name: '傣族'
      },
      {
        id: '30',
        name: '傈僳族'
      },
      {
        id: '31',
        name: '佤族'
      },
      {
        id: '32',
        name: '拉祜族'
      },
      {
        id: '33',
        name: '纳西族'
      },
      {
        id: '34',
        name: '景颇族'
      },
      {
        id: '35',
        name: '布朗族'
      },
      {
        id: '36',
        name: '阿昌族'
      },
      {
        id: '37',
        name: '普米族'
      },
      {
        id: '38',
        name: '怒族'
      },
      {
        id: '39',
        name: '德昂族'
      },
      {
        id: '40',
        name: '独龙族'
      },
      {
        id: '41',
        name: '基诺族'
      },
      {
        id: '42',
        name: '苗族'
      },
      {
        id: '43',
        name: '布依族'
      },
      {
        id: '44',
        name: '侗族'
      },
      {
        id: '45',
        name: '水族'
      },
      {
        id: '46',
        name: '仡佬族'
      },
      {
        id: '47',
        name: '壮族'
      },
      {
        id: '48',
        name: '瑶族'
      },
      {
        id: '49',
        name: '仫佬族'
      },
      {
        id: '50',
        name: '毛南族'
      },
      {
        id: '51',
        name: '京族'
      },
      {
        id: '52',
        name: '土家族'
      },
      {
        id: '53',
        name: '黎族'
      },
      {
        id: '54',
        name: '畲族'
      },
      {
        id: '55',
        name: '高山族'
      }
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  onLoad: function (options) {
    // this.MyActivity();
    var status = this.data.status
    // app.getToken()
    // this.inputOpenId()
    this.Branches()
    this.getNowDate()
    if(this.data.userInfo.studentId){
      this.inputInfo()
      console.log('填充信息')
    }
    // this.inputInfo()

    // this.inputInfo()
  },
  onShow: function () {
    var that = this
    app.getToken()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  async inputInfo() {
    var userInfo = this.data.userInfo
    var userId = userInfo.userId
    getInfo(userId).then(res => {
      var mainInfo = res.data.data.item.main
      var detailInfo = res.data.data.item.details
      var timeStamp = Date.parse(new Date())
      var date = new Date(timeStamp)
      var year = date.getFullYear()
      console.log(mainInfo)
      console.log(detailInfo)
      this.byteToString(detailInfo.dormitoryNo)
      this.Groups(userInfo.branchId)
      if (mainInfo.studentId) {
        this.setData({
          index: "0",
          name: mainInfo.name,
          gender: detailInfo.gender,
          genderIndex: detailInfo.gender * 1,
          status: mainInfo.status,
          statusReason: mainInfo.statusReason,
          studentId: mainInfo.studentId,
          branchIndex: mainInfo.branchId - 1 + "",
          branchId: mainInfo.branchId,
          branchName: mainInfo.branchName,
          groupId: mainInfo.groupId,
          groupIndex: mainInfo.groupId - 1 + "",
          nation: detailInfo.nation,
          nationIndex: "0",
          origin: detailInfo.origin,
          gradeIndex: year - detailInfo.grade + "",
          grade: detailInfo.grade,
          major: detailInfo.major,
          className: detailInfo.className,
          phone: detailInfo.phone,
          dormitoryArea: detailInfo.dormitoryArea,
          dormitoryNo: detailInfo.dormitoryNo,
          familyAddress: detailInfo.familyAddress,

        })
        console.log(this.data)
      } else if (mainInfo.teacherId) {
        this.setData({
          name: mainInfo.name,
          phone: detailInfo.phone,
          branchId: mainInfo.branchId,
          branchName: mainInfo.branchName,
          groupId: mainInfo.groupId,
          groupIndex: mainInfo.groupId - 1 + "",
        })
        console.log(this.data)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //年级
  async getNowDate() {
    var timeStamp = Date.parse(new Date())
    var date = new Date(timeStamp)
    var year = date.getFullYear()
    var list = this.data.gradeList
    console.log(year)
    for (let i = 0; i < 4; i++) {
      var item = year + ""
      list.push({
        item
      })
      year--
    }
    this.setData({
      gradeList: list
    })
  },
  //查询所有党委
  async Branches() {
    var that = this
    var params = {
      page: 1,
      size: 20
    }
    getBranches(params).then(res => {
      // console.log()
      var branchList = res.data.data.list.items
      that.setData({
        branchNameList: branchList
      })
      console.log(this.data.branchNameList)
    }).catch(err => {
      console.log(err)
    })
  },
  //查询所有党支部
  async Groups(branchId) {
    var that = this
    var params = {
      page: 1,
      size: 20
    }
    getGroups(branchId, params).then(res => {
      var groupList = res.data.data.list.items
      that.setData({
        groupNameList: groupList
      })
      console.log(this.data.groupNameList)
    }).catch(err => {
      console.log(err)
    })
  },

  inputOpenId: function () {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res.data.openId)
        that.setData({
          openId: res.data.openId
        })
      }
    })
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data);
  },
  inputStudentId: function (e) {
    this.setData({
      studentId: e.detail.value
    })
    console.log(this.data)
  },
  inputTeacherId: function (e) {
    this.setData({
      teacherId: e.detail.value
    })
    console.log(this.data)
  },
  inputMajor: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  inputClass: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  inputEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
    console.log(this.data)
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data)
  },
  inputDormNo: function (e) {
    this.setData({
      dormitoryNo: e.detail.value
    })
    console.log(this.data)
  },
  stringToByte: function (str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    this.setData({
      dormitoryNo: bytes
    })
  },
  byteToString: function (arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    console.log(str);
  },
  inputPartyAge: function (e) {
    this.setData({
      partyAge: e.detail.value * 1
    })
    console.log(this.data)
  },
  inputAddress: function (e) {
    var _page = this;
    wx.chooseLocation({
      success: (res) => {
        _page.setData({
          familyAddress: res.address
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  PickerInstitude: function (e) {
    var _institude = this.data.instituteList[e.detail.value].name
    this.setData({
      instituteIndex: e.detail.value,
      institute: _institude
    })
  },
  PickerBranch: function (e) {
    var _branchName = this.data.branchNameList[e.detail.value].name
    this.setData({
      branchIndex: e.detail.value,
      branchId: e.detail.value * 1 + 1,
      branchName: _branchName
    })
    this.Groups(this.data.branchId)
    console.log(this.data)
  },
  PickerGroup: function (e) {
    var _groupName = this.data.groupNameList[e.detail.value].name
    this.setData({
      groupIndex: e.detail.value,
      groupId: e.detail.value * 1 + 1,
      groupName: _groupName
    })
    console.log(this.data)
  },
  PickerGrade: function (e) {
    var _grade = this.data.gradeList[e.detail.value].item
    this.setData({
      gradeIndex: e.detail.value,
      grade: _grade * 1
    })
    console.log(this.data)
  },
  PickerNation: function (e) {
    var _nation = this.data.nationArray[e.detail.value].name
    this.setData({
      nationIndex: e.detail.value,
      nation: _nation
    })
    console.log(this.data)
  },
  PickerDorm: function (e) {
    var _dormitoryArea = this.data.dormitoryAreaList[e.detail.value].name
    this.setData({
      dormitoryAreaIndex: e.detail.value,
      dormitoryArea: _dormitoryArea
    })
    console.log(this.data)
  },
  PickerSex: function (e) {
    this.setData({
      genderIndex: e.detail.value,
      gender: e.detail.value * 1
    });
    console.log(this.data);
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      birthday: e.detail.value
    })
    console.log(this.data)
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      origin: e.detail.value[0] + e.detail.value[1] + e.detail.value[2],
      // province : e.detail.value[0],
      // city : e.detail.value[1],
      // county : e.detail.value[2]
    })
    console.log(this.data)
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  statusReasonInput(e) {
    this.setData({
      statusReason: e.detail.value
    })
  },
  bindSubmitStudent(e) {
    this.stringToByte(this.data.dormitoryNo)
    var studentEntity = {
      name: this.data.name,
      gender: this.data.gender,
      studentId: this.data.studentId,
      branchId: this.data.branchId,
      branchName: this.data.branchName,
      groupId: this.data.groupId,
      groupName: this.data.groupName,
      institude: this.data.institute,
      // birthday : this.data.birthday,
      nation: this.data.nation,
      origin: this.data.origin,
      grade: this.data.grade,
      major: this.data.major,
      className: this.data.className,
      phone: this.data.phone,
      email: this.data.email,
      familyAddress: this.data.familyAddress,
      dormitoryArea: this.data.dormitoryArea,
      dormitoryNo: this.data.dormitoryNo,
      status: this.data.status
    }

    // console.log(typeof(studentEntity))
    console.log(studentEntity)
    // console.log(e.detail.value)
    // this.stringToByte(this.data.dormitoryNo)
    //student

    if (studentEntity['name'] && studentEntity['gender'] && studentEntity['studentId'] && studentEntity['branchId'] && studentEntity['branchName'] && studentEntity['origin'] && studentEntity['nation']) {
      wx.showModal({
        title: '提示',
        content: '请确认信息填写无误',
        success(res) {
          if (res.confirm) {
            console.log('确定')
            bindStudent(studentEntity).then(res => {
              console.log(res)
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                success: function() {
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1500)
                }
              })
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '绑定失败，请重新提交',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写信息',
        icon: 'none'
      })
    }
  },
  bindSubmitTeacher(e) {
    var teacherEntity = {
      name: this.data.name,
      gender: this.data.gender,
      teacherId: this.data.teacherId,
      email: this.data.email,
      phone: this.data.phone,
      partyAge: this.data.partyAge,
      branchId: this.data.branchId,
      branchName: this.data.branchName,
      groupId: this.data.groupId,
      groupName: this.data.groupName,
    }
    console.log(teacherEntity)
    //teacher

    if (teacherEntity['name'] && teacherEntity['gender'] && teacherEntity['teacherId'] && teacherEntity['branchId'] && teacherEntity['branchName'] && teacherEntity['email'] && teacherEntity['phone'] && teacherEntity['partyAge']) {
      wx.showModal({
        title: '提示',
        content: '请确认信息填写无误',
        success(res) {
          if (res.confirm) {
            console.log('确定')
            bindTeacher(teacherEntity).then(res => {
              console.log(res)
              wx.showToast({
                title: '绑定成功',
                icon: 'success'
              })
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '绑定失败，请重新提交',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写信息',
        icon: 'none'
      })
    }
  },
})