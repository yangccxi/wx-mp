// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _openId = wxContext.OPENID;

  let _r = "wait";

  await db.collection("user").add({
    data: {
      openId: _openId,
      type: event.type,
      time: new Date().getTime()
    }
  }).then(res => {
    _r = "success";
  }).catch(err => {
    _r = "fail";
  })

  return _r;
}