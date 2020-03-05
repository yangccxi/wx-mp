import {
  ajaxuserLogin,
  ajaxconfig
} from "../../utils/service.js";

import {
  cctoast
} from "../../utils/util.js";

Page({
  onReady() {
    ajaxconfig((res) => {
      console.info(res.note)
      if (res.note) {
        wx.redirectTo({
          url: '../note/note',
        })
      } else {
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

  }
})