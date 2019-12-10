//厨师插入菜谱
//入参 int date 日期
//入参 string time 时间
//入参 string remark 备注
//入参 array food 菜谱列表
//入参 string cookOpenId 绑定的大厨
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
  }

  await db.collection("order").add({
    data: {
      openId: _openId,
      date: event.date,
      time: event.time,
      remark: event.remark,
      food: event.food,
      cookOpenId: event.cookOpenId,
      creatTime: new Date().getTime(),
      status: "wait",
    }
  }).then(res => {
    _r.success = true;
    _r.msg = "成功";
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err)
  })

  return _r;
}