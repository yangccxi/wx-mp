const IMG = "cloud://cytar-b74bc9.691f-cytar-b74bc9-1257593555/";

//用户接口
export const USER = {
  "login": "login", //用户登录
  "reg": "reg", //用户注册
  "relation": "relationQuery", //用户绑定关系
}

//菜谱接口
export const FOOD = {
  "add": "foodAdd",
  "query": "foodQuery",
  "delete": "foodDelete",
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
  "家常菜",
  "湘菜",
  "川菜",
  "粤菜",
]