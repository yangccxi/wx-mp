Page({
  data: {
    tabs: ["html","css"]
  },
  copy() {
    wx.setClipboardData({
      data: "cc_myWorld"
    })
  }
})