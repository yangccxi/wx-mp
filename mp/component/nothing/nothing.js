Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    nothing: {
      type: String,
      value: "暂无内容哦~"
    },
    showBtn: {
      type: Boolean,
      value: false
    },
    btn: {
      type: String,
      value: "点我"
    }
  },
  methods: {
    click() {
      this.triggerEvent("click");
    }
  },
})