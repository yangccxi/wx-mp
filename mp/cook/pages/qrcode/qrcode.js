var QR = require("../../../utils/qrcode.js");

import {
  cciphone6scale
} from "../../../utils/util.js";

Page({
  data: {
    headImg: "",
  },
  onReady() {
    let _user = getApp().user;
    this.setData({
      headImg: _user.headImg,
    })
    cciphone6scale(s => {
      QR.api.draw(_user.openId, "qrcode", 500 * s, 500 * s);
    })
  }
})