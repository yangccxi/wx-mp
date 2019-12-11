//用户登录
//查询user集合是否有此openId 
//如果有则返回身份type:1为厨师 2为吃货；
//如果没有则返回身份type:0
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _openId = wxContext.OPENID;

  let _r = {
    type: 0,
    success: false,
    msg: "出现未知故障，请稍后再试",
    user: {},
  }

  await db.collection("user").where({
    openId: _openId
  }).get().then(res => {
    _r.success = true;
    _r.msg = "成功";
    if (res.data.length) {
      _r.type = res.data[0].type;
      let _data = res.data[0];
      _r.user = {
        "name": _data.name,
        "headImg": _data.headImg,
        "id": _data._id,
        "openId": _openId,
      }
    }
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err)
  })
  return _r;
}