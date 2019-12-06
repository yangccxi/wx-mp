//吃货查询绑定关系
const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    openId: "",
  }

  await db.collection("relation").where({
    openId: _openId
  }).get().then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
    if (res.data.length) _r.openId = res.data[0].openId;
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}