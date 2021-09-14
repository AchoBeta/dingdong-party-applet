const app = getApp()
const {
    request
} = require("request.js")

//接口格式： 接口名称:(接收参数) => request(url, data = {}, type = 'application/x-www-form-urlencoded', method = 'GET')

module.exports = {
  //查询所有小程序端可显示的活动（全部活动）//按条件分页查询活动
  getAllActivity : (params)=> request("/organization/activities",params),
  //根据条件（branchId、groupId）查询活动（与我相关）
  getRelatedActivity : (params) => request("/organization/activities",params),
  //查询我的活动
  getMyActivity : (userId) => request('/base/users/' + userId + '/acitvities'),
  //根据活动id请求详情数据
  getActivityDetail : (activityId) => request('/organization/activities/' + activityId),
  //获取活动人数
  getActivityPeopleNum : (activityId) =>  request('/organization/activities/'+activityId+'/users/query-by-activityId'),
  //申请参与活动
  applyParticipation : (userId,activityId) => request('/organization/activities/' + activityId + '/users/' + userId + '/participate',{},'application/x-www-form-urlencoded',"POST"),
  //首次提交心得评论
  FirstPublishExperience : (activityId,comment) => request('/organization/activities/' + activityId + '/comments',comment,'application/json;charset=UTF-8',"POST"),
  //更改心得评论
  updateExperience : (activityId,commentId,comment) => request('/organization/activities/' + activityId + '/comments/' + commentId , comment , 'application/json;charset=UTF-8' , "PUT"),
  //查询所有心得评论
  getComments : (activityId,params) => request('/organization/activities/' + activityId + '/comments', params),
  //请假申请
  applyForLeave : (userId,activityId,reason) => request('/organization/activities/' + activityId + '/users/' + userId + '/leave', {reason:reason} , 'application/x-www-form-urlencoded' , "POST"),

  //添加学生信息
  bindStudent : (studentEntity) => request('/base/users/student-info', studentEntity, 'application/json;charset=UTF-8', 'POST'),
  //更新学生信息
  updateStudent : (studentId, updateStudentEntity) => request('/base/students/' + studentId, updateStudentEntity, 'application/json;charset=UTF-8', "PUT"),
  //添加教师信息
  bindTeacher : (teacherEntity) => request('/base/users/teacher-info', teacherEntity,'application/json;charset=UTF-8', 'POST'),
  //党支部查询
  getBranches : (params) => request('/base/branches/', params),
  //党组查询
  getGroups : (branchId, params) => request('/base/branch/' + branchId + '/groups', params),
  //获取用户信息
  getStudentInfo : (studentNo) => request('/base/students/' + studentNo),
  getTeacherInfo : (teacherNo) => request('/base/instructors/' + teacherNo),
  getInfo : (userId) => request('/base/users/' + userId + '/info'),
  //获取用户五个阶段及时间
  getUserStage:(params)=> request('base/user-stages',params),

  //查询用户党委下所有党支部  //branch是党委, group是党支部
  queryGroup : (branchId,params)=> request('/base/branch/'+branchId+'/groups',params),
  
  //获取token
  requestToken : (openId) => request('/base/users/login',{openId:openId},'application/x-www-form-urlencoded' , "POST"),
  //获取入党阶段
  getStage : (id) => request('/base/stages/' + id),
  getAllStage : () => request('/base/stages/'),
  //获取最高年级
  getGrade : () => request('/base/others/max-grade'),
  //获取最高期数
  getMaxStage : () => request('/base/others/max-periods'),
}