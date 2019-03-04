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
    alert(params)
    alert(dingtalkCode)
    axios.get('/api/ddtalk/miandeng/h5config?purl=' + params + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        alert(JSON.stringify(res))
        cb(res);
      }).catch((error) => {
        alert(JSON.stringify(error))
      return Promise.reject(error)
    })
  },
  /**
   * 登录
   * @param params
   * @param cb
   */
  getLogin: function (data, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('/dingding/es/login?code=' + data + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
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
  getceshi: function (cb) {
    axios.get('/pm/omvaluate/list')
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
  }
}
