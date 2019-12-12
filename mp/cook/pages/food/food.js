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

import {
  foodType
} from "../../../utils/config.js";

Page({
  data: {
    more: false,
    pull: false,
    text: "",
    nothing: false,
    list: [],
    height: 2000,
    typeR: [],
    type: "正餐",
    top: 0,
  },
  loadAjax() {
    ccloading();
    ajaxfoodQuery(this.data.type, list => {
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
    cciphone6size(96, height => {
      this.setData({
        height
      })
    })
    this.setData({
      typeR: foodType
    })
    this.loadAjax();
  },
  type(e) {
    this.setData({
      top: 0,
      list: [],
      type: this.data.typeR[e.detail.value]
    })
    this.loadAjax();
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