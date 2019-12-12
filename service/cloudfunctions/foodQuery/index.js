//根据openId查询菜谱列表
//入参 string type 正餐 早餐 甜点 夜宵
const cloud = require('wx-server-sdk');

cloud.init({
  env: "cytar-3rpre"
});

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    list: [],
  }

  await db.collection("food").where({
    openId: _openId,
    foodType: event.type,
  }).get().then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
    _r.list = res.data;
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}