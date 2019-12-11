// 查询用户信息
// 入参 string openId
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    user: {}
  }

  await db.collection("user").where({
    openId: event.openId
  }).get().then(res => {
    _r.success = true;
    _r.msg = "成功";
    let _data = res.data[0];
    _r.user = {
      "name": _data.name,
      "headImg": _data.headImg
    }
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}