import {
  ajaxuserGetUserInfoByOpenId
} from "../../../utils/service.js";

import {
  ccloading,
  ccloadingHide,
  cctoast,
} from "../../../utils/util.js";

Page({
  data: {
    headImg: "",
    name: "",
  },
  onReady() {
    ccloading();
    console.info(getApp().bindOpenId)
    ajaxuserGetUserInfoByOpenId(getApp().bindOpenId, user => {
      ccloadingHide();
      this.setData({
        headImg: user.headImg,
        name: user.name,
      })
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  }
})