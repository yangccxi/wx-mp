//删除菜谱
//入参 string id
const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
  }

  await db.collection("food").doc(event.id).remove().then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}