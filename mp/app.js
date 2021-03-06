App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cytar-3rpre',
        traceUser: true,
      })
    }
  },
  type: 0, //0暂未注册 1为厨师 2为吃货
  user: {}, //headImg 用户头像 name 用户昵称 id openId
  bindOpenId: "", //吃货是否有绑定厨师
})