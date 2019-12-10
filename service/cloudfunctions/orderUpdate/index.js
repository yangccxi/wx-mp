//大厨更新订单记录
//入参 string id
//入参 string cookImg 做好的菜肴图片
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

  await db.collection("order").doc(event.id).update({
    data: {
      cookImg: event.cookImg,
      updater: _openId,
      updateTime: new Date().getTime(),
      status: "cook",
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