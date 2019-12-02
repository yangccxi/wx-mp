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

  },
  onShow() {
    ccloading();
    ajaxuserLogin(res => {
      console.info(res)
      ccloadingHide();
    }, (fail, msg) => {
      cctoast(msg)
      ccloadingHide();
    })
  },
})