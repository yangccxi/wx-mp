import {
  ajaxbindCook,
  ajaxuserGetUserInfoByOpenId,
} from "../../../utils/service.js";

import {
  ccloading,
  ccloadingHide,
  cctoast,
} from "../../../utils/util.js";

Page({
  data: {
    hasScan: true,
    user: {},

    openId: "",
  },
  scan() {
    wx.scanCode({
      // onlyFromCamera: true,
      success: (e) => {
        ccloading();
        ajaxuserGetUserInfoByOpenId(e.result, user => {
          if (user && user.name) {
            this.setData({
              hasScan: false,
              user,
            })
            this.data.openId = e.result;
          } else {
            cctoast("二维码类型不对，请核实");
          }
          ccloadingHide();
        }, (t, m) => {
          ccloadingHide();
          cctoast("二维码类型不对，请核实");
        })
      }
    })
  },
  save() {
    ccloading();
    ajaxbindCook(this.data.openId, success => {
      ccloadingHide();
      wx.navigateBack();
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  }
})