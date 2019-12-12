const IMG = "cloud://cytar-3rpre.6379-cytar-3rpre-1257593555/";

//用户接口
export const USER = {
  "login": "login", //用户登录
  "reg": "reg", //用户注册
  "relation": "relationQuery", //用户绑定关系
  "cookQRCode": "cookQRCode", //大厨二维码
  "cookQuery": "cookQuery", //查询大厨
  "bindCook": "relationAdd", //绑定大厨
  "update": "userInfoEdit", //更新用户信息
  "getUserInfoByOpenId": "getUserInfo", //根据openId查询用户信息
}

//菜谱接口
export const FOOD = {
  "add": "foodAdd", //新增菜谱
  "query": "foodQuery", //查询菜谱列表
  "delete": "foodDelete", //删除菜谱
  "queryByOpenId": "foodQueryByOpenId", //根据openId查询菜谱列表
}

//订单
export const ORDER = {
  "add": "orderAdd", //下单
  "eatQuery": "orderEatQuery", //吃货订单
  "cookQuery": "orderCookQuery", //大厨订单
  "update": "orderUpdate", //大厨完成订单
  "done": "orderDone", //吃货评价完成订单
}

//发送微信消息
export const MSG = {
  "hasOrder": "sendMsgHasOrder", //当吃货下单时提示大厨有新的订单
  "doneFood": "sendMsgDoneFood", //大厨完成菜品通知吃货
}

//默认参数
export const DF = {
  "headImgCook": IMG + "icon/cook.jpg", //厨师头像
  "headImgEat": IMG + "icon/eat.jpg", //吃货头像
}

//菜谱难度
export const difficulty = [
  "简单",
  "中等",
  "困难",
]

//菜谱类型
export const foodType = [
  "正餐",
  "早餐",
  "甜点",
  "夜宵",
]