//用户选择身份
//入参 int type 1为厨师，2为吃货  
//入参 string headImg 头像
//入参 string name 名称
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    id: "",
    openId: _openId,
  }

  await db.collection("user").add({
    data: {
      openId: _openId,
      type: event.type,
      headImg: event.headImg,
      name: event.name,
      time: new Date().getTime()
    }
  }).then(res => {
    _r.success = true;
    _r.msg = "成功";
    _r.id = res._id;
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err)
  })

  return _r;
}