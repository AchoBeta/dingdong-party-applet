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
  //查询用户党委下所有党支部  //branch是党委, group是党支部
  queryGroup : (branchId,params)=> request('/base/branch/'+branchId+'/groups',params)
}