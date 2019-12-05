const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _openId = wxContext.OPENID;

  let _r = {
    openId: _openId,
    type: 0
  }

  await db.collection("user").where({
    openId: _openId
  }).get().then(res => {
    if (res.data.length) {
      _r = {
        openId: _openId,
        type: res.data[0].type
      }
    } else {
      _r = {
        openId: _openId,
        type: 0
      }
    }
  }).catch(err => {
    console.info(err)
  })
  return _r;
}