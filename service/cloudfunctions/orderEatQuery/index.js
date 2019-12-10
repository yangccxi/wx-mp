//吃货查询订单

const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _openId = wxContext.OPENID;

  let _r = {
    success: false,
    msg: "出现未知故障，请稍后再试",
    list: []
  }

  await db.collection("order").where({
    openId: _openId
  }).get().then(res => {
    //满足条件
    _r.success = true;
    _r.msg = "成功";
    _r.list = res.data;
    let _list = res.data;
    let _newList = [];
    let _now = new Date();
    let _nowS = new Date(_now.getFullYear() + "/" + (_now.getMonth() + 1) + "/" + _now.getDate()).getTime();
    console.info(_now.getFullYear() + "/" + (_now.getMonth() + 1) + "/" + _now.getDate())
    console.info(_nowS)
    for (let v of _list) {
      if (_nowS - v.date <= 24 * 60 * 60 * 1000) _newList.push(v);
    }
    _r.list = _newList;
  }).catch(err => {
    console.info("openId=" + _openId + "=>出现问题：" + err);
  })

  return _r;
}