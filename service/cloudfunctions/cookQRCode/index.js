// 大厨二维码
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const _openId = wxContext.OPENID;


  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    qrCode: "",
  }

  try {
    const result = await cloud.openapi.wxacode.get({
      path: 'page/index/index?openId=' + _openId,
      width: 430
    })
    _r.success = true;
    _r.msg = "成功";
    _r.qrCode = result;
    return _r
  } catch (err) {
    console.log(err)
    return _r
  }
}