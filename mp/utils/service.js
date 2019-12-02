let app = getApp();

import {
  USER
} from "./config.js";

/**
 * url 请求路径 String *必传
 * 
 * obj.success 成功回调
 * obj.fail 失败回调 fail:请求失败 timeout:请求超时 networkout:无网络
 */
const ajax = (url, obj) => {
  obj = obj || {};
  wx.getNetworkType({
    success(res) {
      if (res.networkType != "none") {
        wx.cloud.callFunction({
          name: url,
          data: obj.data,
        }).then(res => {
          if (obj.success) obj.success(res.result);
        }).catch(err => {
          if (obj.fail) obj.fail("fail", err);
        })
      } else {
        if (obj.fail) obj.fail("networkout", "网络好像有点问题，请检查后重试！");
      }
    },
    fail() {
      if (obj.fail) obj.fail("networkout", "网络好像有点问题，请检查后重试！");
    }
  })
}

//用户登录
export const ajaxuserLogin = (success, fail) => {
  ajax(USER.login, {
    success(res) {
      success(res.type)
    },
    fail(t, m) {
      fail(t, m)
    }
  })
}

//用户注册
export const ajaxuserReg = (type, success, fail) => {
  ajax(USER.reg, {
    data: {
      type
    },
    success(res) {
      if (res == "success") {
        success(res)
      } else {
        fail("fail", "插入新用户数据出错")
      }
    },
    fail(t, m) {
      fail(t, m)
    }
  })
}