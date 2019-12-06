let app = getApp();

import {
  USER,
  FOOD,
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
          if (res.result.success) {
            if (obj.success) obj.success(res.result);
          } else {
            if (obj.fail) obj.fail("fail", res.result.msg);
          }
        }).catch(err => {
          console.info(err);
          if (obj.fail) obj.fail("fail", "出现未知错误，请稍后再试");
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

/**
 * filePath 上传文件的临时路径 String *必传
 * cloudPath 上传至云端的路径
 * 
 * obj.success 成功回调
 * obj.fail 失败回调 fail:请求失败 timeout:请求超时 networkout:无网络
 */
export const upImg = (filePath, cloudPath, obj) => {
  obj = obj || {};
  wx.getNetworkType({
    success(res) {
      if (res.networkType != "none") {
        let _now = new Date().getTime(); //时间戳
        let _suffix = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length); //文件后缀名
        let _cloudPath = cloudPath + "/" + String(_now) + "_" + String(Math.round(Math.random() * 10000000)) + "." + _suffix; //完整文件路径
        wx.cloud.uploadFile({
          filePath,
          cloudPath: _cloudPath,
          success(res) {
            if (obj.success) obj.success(res.fileID);
          },
          fail(err) {
            if (obj.fail) obj.fail("fail", err);
          }
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
export const ajaxuserReg = (type, headImg, name, success, fail) => {
  ajax(USER.reg, {
    data: {
      type,
      headImg,
      name,
    },
    success(res) {
      success(res)
    },
    fail(t, m) {
      fail(t, m)
    }
  })
}

//厨师上传菜谱
export const ajaxfoodAdd = (img, name, difficulty, foodType, success, fail) => {
  ajax(FOOD.add, {
    data: {
      img,
      name,
      difficulty,
      foodType,
    },
    success(res) {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//厨师查询菜谱列表
export const ajaxfoodQuery = (success, fail) => {
  ajax(FOOD.query, {
    success(res) {
      success(res.list)
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//厨师删除菜谱
export const ajaxfoodDelete = (id, success, fail) => {
  ajax(FOOD.delete, {
    data: {
      id
    },
    success() {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//吃货查找厨师绑定关系
export const ajaxuserRelation = (success, fail) => {
  ajax(USER.relation, {
    success() {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}