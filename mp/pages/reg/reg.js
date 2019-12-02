import {
  cctoast,
  ccloading,
  ccloadingHide
} from "../../utils/util.js";

import {
  ajaxuserReg
} from "../../utils/service.js";

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
  save() {
    if (!this.data.cook && !this.data.eat) {
      cctoast("请选择身份");
      return;
    }
    let _type = this.data.cook ? 1 : 2;
    ccloading()
    ajaxuserReg(_type, success => {
      getApp().type = _type;
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