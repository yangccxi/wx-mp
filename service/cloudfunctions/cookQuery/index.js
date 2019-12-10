// 查询大厨
// 入参 string keyword 关键字
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const _openId = wxContext.OPENID;
  const db = cloud.database();
  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    list: []
  }
  await db.collection("user").where({
    name: {
      $regex: '.*' + event.keyword,
      $options: 'i'
    }
  }).get().then(res => {
    _r.success = true;
    _r.msg = "成功";
    _r.list = res.data;
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}