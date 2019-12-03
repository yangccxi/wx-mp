Component({
  properties: {
    height: {
      type: Number,
      value: 2000
    },
    top: {
      type: Number,
      value: 0
    },
    more: {
      type: Boolean,
      value: false
    },
    pull: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ""
    }
  },
  methods: {
    lower() {
      if (this.data.pull) {
        this.setData({
          pull: false,
          text: "拼命加载中..."
        }, () => {
          this.triggerEvent("lower");
        })
      }
    }
  }
})