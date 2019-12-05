//loading
export const ccloading = (text = "加载中...") => {
  wx.showLoading({
    title: text,
    mask: true
  })
}

export const ccloadingHide = () => {
  wx.hideLoading()
}

//toast
export const cctoast = (text) => {
  wx.showToast({
    title: text,
    mask: true,
    icon: "none",
    duration: 1000,
  })
}

//页面跳转
export const ccnavigateTo = (url) => {
  wx.navigateTo({
    url,
    fail() {
      cctoast("跳转错误，已达到小程序最大页面栈");
    }
  })
}

//计算比例尺寸高度
export const cciphone6size = (size, call) => {
  wx.getSystemInfo({
    success(res) {
      call(Math.round(res.windowHeight - (res.windowWidth * size / 750)));
    }
  })
}