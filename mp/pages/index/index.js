import {
  ajaxuserLogin
} from "../../utils/service.js";

import {
  cctoast
} from "../../utils/util.js";

Page({
  onReady() {
    ajaxuserLogin((type, user) => {
      if (type == 0) {
        wx.redirectTo({
          url: "../reg/reg",
        })
      } else {
        getApp().type = type;
        getApp().user = user;
        wx.switchTab({
          url: "../tabA/tabA"
        })
      }
    }, (fail, msg) => {
      cctoast(msg)
    })
  }
})