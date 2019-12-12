//根据openId查菜谱
//入参 string openId
//入参 string type 正餐 早餐 甜点 夜宵
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cytar-3rpre"
});

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    list: [],
  }

  console.info(event.type)

  await db.collection("food").where({
    openId: event.openId,
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