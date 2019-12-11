// 更新用户信息
// 入参 string id
// 入参 string headImg
// 入参 string name
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
  }

  await db.collection("user").doc(event.id).update({
    data: {
      headImg: event.headImg,
      updater: _openId,
      updateTime: new Date().getTime(),
      name: event.name,
    }
  }).then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}