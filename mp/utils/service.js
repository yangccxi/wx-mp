let app = getApp();

import {
  USER,
  FOOD,
  ORDER,
  MSG,
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
      success(res.type, res.user)
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
      success(res.id, res.openId);
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
export const ajaxfoodQuery = (type, success, fail) => {
  ajax(FOOD.query, {
    data: {
      type
    },
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
  if (getApp().bindOpenId != "") {
    success(getApp().bindOpenId);
  } else {
    ajax(USER.relation, {
      success(res) {
        getApp().bindOpenId = res.openId;
        success(res.openId);
      },
      fail(t, m) {
        fail(t, m);
      }
    })
  }
}

//吃货根据openId查询菜谱列表
export const ajaxfoodQueryByOpenId = (openId, type, success, fail) => {
  ajax(FOOD.queryByOpenId, {
    data: {
      openId,
      type,
    },
    success(res) {
      success(res.list)
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//获取大厨二维码
export const ajaxCookQRCode = (success, fail) => {
  ajax(USER.cookQRCode, {
    success(res) {
      success(res)
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//查询大厨
export const ajaxcookQuery = (keyword, success, fail) => {
  ajax(USER.cookQuery, {
    data: {
      keyword
    },
    success(res) {
      success(res.list);
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//吃货绑定大厨
export const ajaxbindCook = (openId, success, fail) => {
  ajax(USER.bindCook, {
    data: {
      openId
    },
    success(res) {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//吃货下单
export const ajaxorderAdd = (date, time, remark, food, success, fail) => {
  ajax(ORDER.add, {
    data: {
      date,
      time,
      remark,
      food,
      cookOpenId: getApp().bindOpenId,
    },
    success(res) {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//订单
export const ajaxQuery = (type, success, fail) => {
  let _url = ORDER.eatQuery;
  if (type == "cook") _url = ORDER.cookQuery;
  ajax(_url, {
    success(res) {
      success(res.list);
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//大厨完成订单
export const ajaxorderUpdate = (cookImg, id, success, fail) => {
  ajax(ORDER.update, {
    data: {
      cookImg,
      id,
    },
    success(res) {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//吃货评价完成订单
export const ajaxorderDone = (appraise, id, success, fail) => {
  ajax(ORDER.done, {
    data: {
      appraise,
      id,
    },
    success(res) {
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//更新用户信息
export const ajaxuserEdit = (headImg, name, success, fail) => {
  ajax(USER.update, {
    data: {
      id: getApp().user.id,
      headImg,
      name,
    },
    success(res) {
      getApp().user.headImg = headImg;
      getApp().user.name = name;
      success();
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//根据openId查询用户信息
export const ajaxuserGetUserInfoByOpenId = (openId, success, fail) => {
  ajax(USER.getUserInfoByOpenId, {
    data: {
      openId
    },
    success(res) {
      success(res.user);
    },
    fail(t, m) {
      fail(t, m);
    }
  })
}

//当吃货下单时提示大厨有新的订单
export const sendMsgHasOrder = (openId, food) => {
  ajax(MSG.hasOrder, {
    data: {
      openId,
      name: getApp().user.name,
      food,
    },
    success(res) {

    },
    fail(t, m) {

    },
  })
}

//大厨完成菜品通知吃货
export const sendMsgDoneFood = (openId, food) => {
  ajax(MSG.doneFood, {
    data: {
      openId,
      name: getApp().user.name,
      food,
    },
    success(res) {

    },
    fail(t, m) {

    },
  })
}

//同意接受消息通知
export const agreeMsg = (type, call) => {
  let _r = ["mrG_dW1OtAs3Mp6qH7DXAFhZwvFt7shkST_9aSWRZyQ"];
  if (type == "eat") _r = ["CHFd9WJYWQOf1w38NrV4CBovj655dxGXHUbbtfC-i3o"];
  wx.requestSubscribeMessage({
    tmplIds: _r,
    success(res) {
      console.info(res)
    },
    fail(res) {
      console.info(res)
    },
    complete: () => {
      call();
    }
  })
}