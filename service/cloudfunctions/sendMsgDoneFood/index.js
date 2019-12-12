// 大厨完成菜品通知吃货
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cytar-3rpre"
});

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let _name = event.name;
    if (_name.length >= 20) _name = _name.substring(0, 20);
    let _food = event.food;
    if (_food.length >= 20) _food = _food.substring(0, 20);
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openId,
      page: 'pages/index/index',
      data: {
        thing2: {
          value: _name
        },
        thing5: {
          value: _food
        },
        thing11: {
          value: "美味已完成，快来看看吧~"
        },
      },
      templateId: 'CHFd9WJYWQOf1w38NrV4CJ36EO9YpmczSY98r_mnWo4'
    })
    return result
  } catch (err) {
    return err
  }
}