import {
  ccloading,
  ccloadingHide,
  cctoast,
} from "../../../utils/util.js";

import {
  ajaxorderAdd,
} from "../../../utils/service.js";

Page({
  data: {
    date: "请选择",
    dateR: ["今天", "明天"],
    time: "请选择",
    timeR: ["早餐", "午餐", "晚餐", "夜宵"],
    remark: "",

    ccfood: {}
  },
  onReady() {
    this.data.ccfood = wx.getStorageSync("ccfood");
  },
  date(e) {
    this.setData({
      date: this.data.dateR[e.detail.value]
    })
  },
  time(e) {
    this.setData({
      time: this.data.timeR[e.detail.value]
    })
  },
  remark(e) {
    this.data.remark = e.detail.value;
  },
  save() {
    let _now = new Date();
    let _nowS = new Date(_now.getFullYear() + "/" + (_now.getMonth() + 1) + "/" + _now.getDate()).getTime()
    let _tomorrowS = _nowS + 24 * 60 * 60 * 1000;
    if (this.data.date == "请选择") {
      cctoast("请选择日期");
      return;
    }
    if (this.data.time == "请选择") {
      cctoast("请选择时间");
      return;
    }
    let _date = _nowS;
    if (this.data.date == "明天") _date = _tomorrowS;
    ccloading();
    ajaxorderAdd(_date, this.data.time, this.data.remark, this.data.ccfood, success => {
      ccloadingHide();
      cctoast("下单成功");
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/tabA/tabA"
        })
      }, 1000)
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  },
})