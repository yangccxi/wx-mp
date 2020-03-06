Page({
  data: {
    show: true,
    time: null
  },
  onReady() {
    this.time = setTimeout(() => {
      this.setData({
        show: false
      })
    }, 2000)
  },
  noteIndex(){
    wx.navigateTo({
      url: '../noteIndex/noteIndex',
    })
  }
})