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
    type: "正餐",
    typeR: [],
    top: 0,
    newList: [],
    showBox: false,
  },
  loadAjax() {
    getApp().bindOpenId = "oBkcQ0cE6VHiVCpJDth31xIIP2iA";

    ccloading();
    ajaxfoodQueryByOpenId(getApp().bindOpenId, this.data.type, list => {
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
    cciphone6size(184, height => {
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
      type: this.data.typeR[e.detail.value],
    })
    this.loadAjax();
  },
  choose(e) {
    let _list = this.data.list;
    let _index = e.currentTarget.dataset.index;
    if (!_list[_index].choose) {
      _list[_index].choose = true;
      this.setData({
        list: _list,
        newList: this.data.newList.concat(_list[_index])
      })
    } else {
      let _newList = this.data.newList;
      for (let i = 0; i < _newList.length; i++) {
        if (_list[_index]._id == _newList[i]._id) {
          _newList.splice(i, 1);
          break;
        }
      }
      _list[_index].choose = false;
      this.setData({
        newList: _newList,
        list: _list,
      })
    }
  },
  foodDetail() {
    if (this.data.newList.length == 0) {
      cctoast("请选择至少一种美食");
      return;
    }
    wx.setStorageSync("ccfood", this.data.newList);
    ccnavigateTo("../foodDetail/foodDetail");
  },
  showBox() {
    this.setData({
      showBox: true,
    })
  },
  hideBox() {
    this.setData({
      showBox: false,
    })
  },
  delete(e) {
    let _list = this.data.list;
    let _newList = this.data.newList;
    let _index = e.currentTarget.dataset.index;
    for (let i = 0; i < _list.length; i++) {
      if (_newList[_index]._id == _list[i]._id) {
        _list[i].choose = false;
      }
    }
    _newList.splice(_index, 1);
    this.setData({
      newList: _newList,
      list: _list,
    })
  },
})