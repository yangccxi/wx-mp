import {
  ccloading,
  ccloadingHide,
  cctoast,
  cciphone6size,
  ccnavigateTo,
  ccmodal,
} from "../../utils/util.js";

import {
  ajaxuserRelation,
  ajaxQuery,
  upImg,
  ajaxorderUpdate,
  ajaxorderDone,
  agreeMsg,
  sendMsgDoneFood,
} from "../../utils/service.js";

Page({
  data: {
    type: 0,
    more: false,
    pull: false,
    text: "",
    height: 2000,
    list: [],
    nothing: false,
    show: true,
    appraise: false,
    slide: "一般",
    cookImg: "",
    id: "",
    index: "",
    look: false,
  },
  onShow() {
    if (this.data.show) {
      this.setData({
        type: getApp().type,
        nothing: false,
        list: [],
        slide: "一般",
      })
      let _type = "eat";
      if (getApp().type == 1) _type = "cook";
      ccloading();
      ajaxQuery(_type, list => {
        ccloadingHide();
        let _list = list;
        let _now = new Date();
        let _nowS = new Date(_now.getFullYear() + "/" + (_now.getMonth() + 1) + "/" + _now.getDate()).getTime();
        for (let v of _list) {
          if (_nowS == v.date) {
            v.date = "今天";
          } else {
            v.date = "明天";
          }
        }
        this.setData({
          list: _list,
          nothing: list.length == 0 ? true : false
        })
      }, (t, m) => {
        ccloadingHide();
        cctoast(m);
      })
    } else {
      this.data.show = true;
    }
  },
  onReady() {
    cciphone6size(96, height => {
      this.setData({
        height
      })
    })
  },
  //厨师我的菜谱
  food() {
    agreeMsg("cook", () => {
      ccnavigateTo("/cook/pages/food/food");
    })
  },
  //吃货我的菜谱
  foodE() {
    ccloading();
    agreeMsg("eat", () => {
      ajaxuserRelation(success => {
        ccloadingHide();
        if (success == "") {
          ccmodal("您还没有御用大厨哦~", {
            confirmText: "去选择",
            success() {
              ccnavigateTo("/eat/pages/bindCook/bindCook");
            }
          })
        } else {
          ccnavigateTo("/eat/pages/food/food");
        }
      }, (t, m) => {
        ccloadingHide();
        cctoast(m);
      })
    })
  },
  //厨师上传图片
  cook(e) {
    this.data.show = false;
    wx.chooseImage({
      count: 1,
      success: (res) => {
        ccloading();
        upImg(res.tempFilePaths[0], "workFood", {
          success: (res) => {
            ccloading();
            ajaxorderUpdate(res, e.currentTarget.dataset.id, success => {
              ccloadingHide();
              cctoast("搞定！");
              setTimeout(() => {
                this.data.list[e.currentTarget.dataset.index].status = "cook";
                this.setData({
                  list: this.data.list
                })
              }, 1000)
              //大厨完成菜肴通知吃货
              sendMsgDoneFood(e.currentTarget.dataset.openid, e.currentTarget.dataset.food.map(v => {
                return v.name;
              }).join("+"))
              
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
  //吃货评价
  appraise(e) {
    this.setData({
      appraise: true
    })
    this.data.id = e.currentTarget.dataset.id;
    this.data.index = e.currentTarget.dataset.index;
    this.data.cookImg = e.currentTarget.dataset.img;
  },
  //吃货滑块
  slide(e) {
    let slide = "";
    switch (e.detail.value) {
      case 1:
        slide = "太糟糕了";
        break;
      case 2:
        slide = "完蛋了";
        break;
      case 3:
        slide = "一般";
        break;
      case 4:
        slide = "很好很好";
        break;
      case 5:
        slide = "简直太好恰了";
        break;
    }
    this.setData({
      slide
    })
  },
  pre(e) {
    this.data.show = false;
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  //吃货去评价
  tall() {
    ccloading();
    ajaxorderDone(this.data.slide, this.data.id, success => {
      ccloadingHide();
      cctoast("谢谢您的评价啦！");
      setTimeout(() => {
        this.data.list[this.data.index].status = "done";
        this.setData({
          list: this.data.list,
          appraise: false,
        })
      }, 1000)
    }, (t, m) => {
      ccloadingHide();
      cctoast(m);
    })
  },
  //大厨去查看评价
  look(e) {
    this.setData({
      look: true,
      cookImg: e.currentTarget.dataset.img,
      slide: e.currentTarget.dataset.appraise
    })
  },
  hide() {
    this.setData({
      look: false,
      appraise: false,
    })
  }
})