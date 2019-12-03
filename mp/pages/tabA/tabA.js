import {
  ajaxuserLogin
} from "../../utils/service.js";

import {
  ccloading,
  ccloadingHide,
  cctoast
} from "../../utils/util.js";

Page({
  data: {
    type: 0
  },
  onShow() {
    this.setData({
      type: getApp().type
    })
  },
})