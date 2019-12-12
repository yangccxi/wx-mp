import {
  ajaxuserEdit,
  upImg,
  ajaxuserRelation,
} from "../../utils/service.js";

import {
  ccloading,
  ccloadingHide,
  cctoast,
  ccnavigateTo,
  ccmodal,
} from "../../utils/util.js";

Page({
  data: {
    headImg: "",
    name: "",
    editName: false,
    focus: false,
    type: 0,

    nameD: ""
  },
  onShow() {
    let _user = getApp().user;
    this.setData({
      headImg: _user.headImg,
      name: _user.name,
      type: getApp().type,
    })

    this.data.nameD = _user.name
  },
  editName() {
    this.setData({
      editName: true,
      focus: true,
    })
  },
  name(e) {
    this.data.nameD = e.detail.value;
  },
  //修改姓名
  saveName() {
    ccloading();
    ajaxuserEdit(this.data.headImg, this.data.nameD, success => {
      ccloadingHide();
      this.setData({
        editName: false,
        name: this.data.nameD
      })
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  },
  //修改头像
  headImg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        ccloading();
        upImg(res.tempFilePaths[0], "userHeadImg", {
          success: (res) => {
            ajaxuserEdit(res, this.data.name, success => {
              ccloadingHide();
              this.setData({
                headImg: res
              })
            }, (t, m) => {
              ccloadingHide();
              cctoast(m);
            })
          },
          fail(t, m) {
            ccloadingHide();
            cctoast(m);
          }
        })
      }
    })
  },
  qrcode() {
    ccnavigateTo("/cook/pages/qrcode/qrcode");
  },
  myCook(){
    ccloading();
    ajaxuserRelation(success => {
      console.info(success)
      ccloadingHide();
      if (success == "") {
        ccmodal("您还没有御用大厨哦~", {
          confirmText: "去选择",
          success() {
            ccnavigateTo("/eat/pages/bindCook/bindCook");
          }
        })
      } else {
        ccnavigateTo("/eat/pages/myCook/myCook");
      }
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  },
  onHide() {
    this.setData({
      editName: false,
      focus: false,
    })
  },
})