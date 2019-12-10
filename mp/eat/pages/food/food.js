import {
  ccloading,
  ccloadingHide,
  cctoast,
  cciphone6size,
  ccnavigateTo,
} from "../../../utils/util.js";

import {
  ajaxfoodQueryByOpenId,
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
  loadAjax() {
    ccloading();
    ajaxfoodQueryByOpenId(getApp().bindOpenId, list => {
      for (let v of list) {
        v.choose = false;
      }
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
    cciphone6size(88, height => {
      this.setData({
        height
      })
    })
    this.loadAjax();
  },
  choose(e) {
    let _list = this.data.list;
    let _index = e.currentTarget.dataset.index;
    _list[_index].choose = !_list[_index].choose;
    this.setData({
      list: _list
    })
  },
  foodDetail(e) {
    let _newList = [];
    for (let v of this.data.list) {
      if (v.choose) _newList.push(v)
    }
    if (_newList.length == 0) {
      cctoast("请选择至少一种美食");
      return;
    }
    wx.setStorageSync("ccfood", _newList);
    ccnavigateTo("../foodDetail/foodDetail");
  }
})