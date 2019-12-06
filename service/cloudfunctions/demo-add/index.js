//插入数据demo
//入参 int test 说明
//出参 int test 说明
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

  await db.collection("test").add({
    data: {
      test: event.test,
      time: new Date().getTime(),
    }
  }).then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
    //不满足条件
    _r.msg = "不满足条件原因";
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}