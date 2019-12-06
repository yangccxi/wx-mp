//厨师插入菜谱
//入参 string img 图片
//入参 string name 名称
//入参 string difficulty 菜谱难度
//入参 string foodType 菜谱类型
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

  await db.collection("food").add({
    data: {
      openId: _openId,
      difficulty: event.difficulty,
      img: event.img,
      name: event.name,
      foodType: event.foodType,
      time: new Date().getTime(),
    }
  }).then(res => {
    _r.success = true;
    _r.msg = "成功";
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err)
  })

  return _r;
}