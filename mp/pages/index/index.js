import {
  ajaxuserLogin
} from "../../utils/service.js";

import {
  cctoast
} from "../../utils/util.js";

Page({
  onReady() {
    ajaxuserLogin(res => {
      if (res == 0) {
        wx.redirectTo({
          url: "../reg/reg",
        })
      }else{
        getApp().type = res;
        wx.switchTab({
          url: "../tabA/tabA"
        })
      }
    }, (fail, msg) => {
      cctoast(msg)
    })
  }
})