import {
  ajaxcookQuery,
  ajaxbindCook,
} from "../../../utils/service.js";

import {
  cciphone6size,
  ccloading,
  ccloadingHide,
  cctoast,
  ccmodal,
} from "../../../utils/util.js";

Page({
  data: {
    height: 2000,
    list: [],
    nothing: false
  },
  onReady() {
    cciphone6size(96, height => {
      this.setData({
        height
      })
    })
  },
  //搜索
  search(e) {
    if (e.detail.value == "") {
      cctoast("请输入搜索条件");
    } else {
      ccloading();
      ajaxcookQuery(e.detail.value, list => {
        this.setData({
          list,
          nothing: list.length == 0 ? true : false
        })
        ccloadingHide();
      }, (t, m) => {
        ccloadingHide();
        cctoast(m);
      })
    }
  },
  //选择
  choose(e) {
    let _openId = e.currentTarget.dataset.openid;
    ccloading();
    ajaxbindCook(_openId, success => {
      ccloadingHide();
      getApp().bindOpenId = _openId;
      ccmodal("绑定成功", {
        success() {
          wx.redirectTo({
            url: "../food/food"
          })
        }
      })
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  }
})