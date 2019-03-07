import axios from './axiosConfig';
import ding from '../lib/ding'

const AUTH_DINGTALKCODE = 'auth.dingtalkcode';
export default {
  /**
   * 获取JsApi参数
   * @param cb
   */
  getJsApiInfos: function (params, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('worktile/api/ddtalk/miandeng/h5config?purl=' + params + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取Itcode参数
   * @param cb
   */
  getItcodeInfo: function (code, cb) {
    axios.get('worktile/api/ddtalk/miandeng/userid?code=' + code)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 登录
   * @param params
   * @param cb
   */
  getLogin: function (data, cb) {
    axios.post('worktile/dingding/pm/login?code=' + data)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // getLogin: function (data, cb) {
  //   let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
  //   alert('code' + dingtalkCode)
  //   alert(data)
  //   axios.get('worktile/dingding/pm/login?code=' + data + '&dingtalk_code=' + dingtalkCode)
  //     .then((res) => {
  //       alert(JSON.stringify(res))
  //       cb(res);
  //     }).catch((error) => {
  //     return Promise.reject(error)
  //   })
  // }
  /**
   * 登出
   * @param params
   * @param cb
   */
  getLogout: function (cb) {
    axios.get('/app/logout')
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取登录 -- Debug模式用
   * @param params
   * @param cb
   */
  getDebugLogin: function (code, itcode, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('/dingding/es/login?code=' + code + '&debugitcode=' + itcode + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取登录
   * @param params
   * @param cb
   */
  getUserInfos: function (cb) {
    axios.get('/dingding/pm/info')
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 通过钉钉id获取用户itcode
  getUserInfoDdid: function (params, cb) {
    axios.get('/authapi/newleave/getUserInfoByDdid' + '?ddid=' + params)
      .then(res => {
        cb(res)
      }).catch(error => {
      return Promise.reject(error)
    })
  },
  // 通过pomid获取问题详情
  getProjectInfo: function (pomid, cb) {
    axios.get('worktile/api/opermaint/pomlist?pomid=' + pomid)
      .then((res) => {
        console.log(res)
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 获取附件,附件查看
  getFileds: function (fileid, cb) {
    axios.get(fileid).then((res) => {
      cb(res);
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 提交评价详情
  commitProjectInfo: function (params, cb) {
    console.log(params);
    axios.post('worktile/api/opermaint/saveorupdate', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
