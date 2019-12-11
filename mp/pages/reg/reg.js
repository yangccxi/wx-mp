import {
  cctoast,
  ccloading,
  ccloadingHide
} from "../../utils/util.js";

import {
  ajaxuserReg
} from "../../utils/service.js";

import {
  DF
} from "../../utils/config.js";

Page({
  data: {
    cook: false,
    eat: false
  },
  //选择厨师
  cook() {
    this.setData({
      cook: true,
      eat: false
    })
  },
  //选择吃货
  eat() {
    this.setData({
      cook: false,
      eat: true
    })
  },
  save(e) {
    if (!this.data.cook && !this.data.eat) {
      cctoast("请选择身份");
      return;
    }
    let _headImg = this.data.cook ? DF.headImgCook : DF.headImgEat;
    let _name = this.data.cook ? "大厨" : "吃货";
    let _type = this.data.cook ? 1 : 2;
    if (e.detail.userInfo) {
      _headImg = e.detail.userInfo.avatarUrl;
      _name = e.detail.userInfo.nickName;
    }
    ccloading()
    ajaxuserReg(_type, _headImg, _name, (id, openId) => {
      getApp().type = _type;
      getApp().user = {
        "name": _name,
        "headImg": _headImg,
        "id": id,
        "openId": openId
      }
      ccloadingHide()
      wx.switchTab({
        url: "../tabA/tabA",
      })
    }, (fail, msg) => {
      cctoast(msg)
      ccloadingHide()
    })
  }
})