// 当吃货下单时提示大厨有新的订单
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cytar-3rpre"
});

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let _name = event.name;
    if (_name.length >= 20) _name = _name.substring(0, 20);
    let _food = event.food;
    if (_food.length >= 20) _food = _food.substring(0, 20);
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openId,
      page: 'pages/index/index',
      data: {
        name1: {
          value: _name
        },
        thing2: {
          value: _food
        },
      },
      templateId: 'mrG_dW1OtAs3Mp6qH7DXAFhZwvFt7shkST_9aSWRZyQ'
    })
    return result
  } catch (err) {
    return err
  }
}