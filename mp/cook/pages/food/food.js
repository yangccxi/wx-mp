import {
  ccloading,
  ccloadingHide,
  cctoast,
  cciphone6size,
  ccnavigateTo,
} from "../../../utils/util.js";

import {
  ajaxfoodQuery,
  ajaxfoodDelete,
} from "../../../utils/service.js";

Page({
  data: {
    more: false,
    pull: false,
    text: "",
    nothing: false,
    list: [],
    height: 2000
  },
  onShow() {
    this.loadAjax();
  },
  loadAjax() {
    ccloading();
    ajaxfoodQuery(list => {
      this.setData({
        list,
        nothing: list.length == 0 ? true : false
      })
      ccloadingHide();
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  },
  onReady() {
    cciphone6size(0, height => {
      this.setData({
        height
      })
    })
  },
  foodAdd() {
    ccnavigateTo("../foodAdd/foodAdd");
  },
  delete(e) {
    ccloading();
    ajaxfoodDelete(e.currentTarget.dataset.id, success => {
      ccloadingHide();
      this.loadAjax();
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  }
})