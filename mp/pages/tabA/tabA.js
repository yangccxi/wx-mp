import {
  ajaxuserLogin
} from "../../utils/service.js";

import {
  ccloading,
  ccloadingHide,
  cctoast,
  cciphone6size,
} from "../../utils/util.js";

Page({
  data: {
    type: 0,
    more: false,
    pull: false,
    text: "",
    height: 2000
  },
  onShow() {
    this.setData({
      type: getApp().type
    })
  },
  onReady() {
    cciphone6size(96, height => {
      this.setData({
        height
      })
    })
  },
})