import {
  difficulty,
  foodType,
} from "../../../utils/config.js";

import {
  ccloading,
  ccloadingHide,
  cctoast,
} from "../../../utils/util.js";

import {
  upImg,
  ajaxfoodAdd,
} from "../../../utils/service.js";

Page({
  data: {
    img: "",
    name: "",
    difficulty,
    foodType,
    difficultyT: "简单",
    foodTypeT: "正餐"
  },
  upImg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          img: res.tempFilePaths[0]
        })
      }
    })
  },
  name(e) {
    this.data.name = e.detail.value;
  },
  difficulty(e) {
    this.setData({
      difficultyT: this.data.difficulty[e.detail.value]
    })
  },
  foodType(e) {
    this.setData({
      foodTypeT: this.data.foodType[e.detail.value]
    })
  },
  save() {
    if (this.data.img == '') {
      cctoast("请上传菜谱图片！");
      return;
    }
    if (this.data.name == "") {
      cctoast("请输入菜谱名称！");
      return;
    }
    ccloading();
    upImg(this.data.img, "food", {
      success: (res) => {
        ajaxfoodAdd(res, this.data.name, this.data.difficultyT, this.data.foodTypeT, success => {
          ccloadingHide();
          cctoast("添加成功");
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
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