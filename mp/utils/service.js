let app = getApp();

import {
	URL,
	IMGS,
	SYSTEM
} from "./config.js";

import {
	ccimgAddHttp,
	cctoast,
	cctime,
	cckeepTwoDecimalFull,
	ccmodal,
	ccnavigateTo
} from "./util.js";

/**
 * 发起 HTTPS 网络请求
 * 
 * url 请求路径 String *必传
 * obj 请求配置 Object
 * 
 * obj.method 请求方法 String (get or post 默认get)
 * obj.logout 是否登出 Boolean 默认不登出
 * obj.showToast 是否显示错误提示信息 Boolean 默认不提示
 * obj.success 成功回调
 * obj.fail 失败回调 fail:请求失败 timeout:请求超时 networkout:无网络
 */
const ajax = (url, obj) => {
	obj = obj || {};
	wx.getNetworkType({
		success(res) {
			if (res.networkType != "none") {
				wx.request({
					url: URL.request + url + (url.indexOf("?") > -1 ? "&" : "?") + "access_token=" + wx.getStorageSync("token"),
					method: obj.method || "get",
					data: obj.data || "",
					success(res) {
						if (res.statusCode == 200) {
							if (res.data.success == true) {
								if (obj.success) obj.success(res.data || {});
							} else {
								if (obj.fail) obj.fail("fail");
								setTimeout(() => {
									if (obj.logout == true && res.data.errorCode == "1003") {
										logout();
										ccmodal("你的账号在其他设备上登录。如果这不是你的操作，你的账号密码已经泄露。请尽快修改密码！");
									} else if (obj.showToast == true && res.data.errorCode != "1003") {
										cctoast(res.data.msg || "服务请求失败！");
									}
								}, 50)
							}
						} else {
							if (obj.fail) obj.fail("fail");
							if (obj.showToast == true) cctoast("服务请求失败！");
						}
					},
					fail(res) {
						let _r = "fail";
						if (res.errMsg.indexOf("timeout") > -1) _r = "timeout";
						if (obj.fail) obj.fail(_r);
						if (obj.showToast == true) _r == "fail" ? cctoast("微信请求失败！") : cctoast("当前网络繁忙，请稍后重试！");
					}
				})
			} else {
				if (obj.fail) obj.fail("networkout");
				if (obj.showToast == true) cctoast("网络好像有点问题，请检查后重试！");
			}
		},
		fail() {
			if (obj.fail) obj.fail("networkout");
			if (obj.showToast == true) cctoast("网络好像有点问题，请检查后重试！");
		}
	})
}

//用户登出 
export const logout = () => {
	wx.setStorageSync("token", "");
	wx.reLaunch({
		url: "/pages/index/index",
	})
}

//启动广告
export const systemAd = (success, fail) => {
	return ajax(`${SYSTEM.ad}?scope=2`, {
		success() {
			success("https://sp.goalwisdom.com/test/register/156956709999089590663.jpg");
		},
		fail() {
			fail();
		}
	})
}