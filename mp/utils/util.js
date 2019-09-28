import {
	IMGS,
	URL
} from "./config.js";

/**
 * 图片域名补全
 * @param img 图片路径 String *必传
 * 
 * @param defaultImg 如果图片为空时代替的图片 String 默认为默认图片
 * @param width 阿里云图片裁剪宽 int 默认不裁剪
 * @param height 阿里云图片裁剪高 int 默认不裁剪
 * @param suffix 阿里云图片格式转换 String 默认转换为jpg(gif默认不转换)
 * 
 */
export const ccimgAddHttp = (img, obj) => {
	obj = obj || {};
	let _r = "";
	if (!img || "undefined" == img) {
		if (!obj.defaultImg) {
			_r = IMGS.nopic;
		} else {
			_r = obj.defaultImg;
		}
	} else {
		let args = "";
		if (obj.width && obj.height) {
			args =
				`x-oss-process=image/resize,m_fill,w_${obj.width},h_${obj.height}`;
		} else if (obj.width) {
			args = `x-oss-process=image/resize,m_fill,w_${obj.width}`;
		} else if (obj.height) {
			args = `x-oss-process=image/resize,m_fill,h_${obj.height}`;
		}
		args += (args.indexOf("x-oss-process=image") > -1 ?
			"" :
			"x-oss-process=image");
		if (img.indexOf("gif") < 0)
			args += `/format,${!obj.suffix ? "jpg" : obj.suffix}`;
		if (args != "") img = img + (img.indexOf("?") > 0 ? "&" : "?") + args;
		_r = img.indexOf("http") != 0 ? URL.img + img : img;
	}
	return _r;
}

//验证手机号码
export const ccphone = (v) => {
	return v != "" && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(v) ? true : false;
}

//验证身份证
export const ccidcard = (v) => {
	return v != "" && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(v) ? true : false;
}

//计算比例尺寸高度
export const cciphone6size = (size, call) => {
	wx.getSystemInfo({
		success(res) {
			call(Math.round(res.windowHeight - (res.windowWidth * size / 750)));
		}
	})
}

//计算比例
export const cciphone6sizeScale = (call) => {
	wx.getSystemInfo({
		success(res) {
			call(res.windowWidth / 750);
		}
	})
}

//微信吐司
export const cctoast = (title, icon = "none") => {
	wx.showToast({
		title: String(title),
		mask: true,
		duration: 1000,
		icon
	})
}

//微信弹框
export const ccmodal = (title, obj = {}) => {
	wx.showModal({
		title: "提示",
		content: String(title),
		showCancel: obj.showCancel || false,
		confirmColor: "#2fd996",
		cancelText: obj.cancelText || "取消",
		confirmText: obj.confirmText || "确定",
		success(res) {
			if (res.confirm) {
				if (obj.success) obj.success();
			} else {
				if (obj.cancel) obj.cancel();
			}
		}
	})
}

//分页规则
export const ccpagesize = (length, size, call) => {
	let more = false;
	let text = "";
	let pull = false;
	let pageShow = "";
	if (length > 0) {
		if (length == size) {
			more = true;
			text = "上拉加载更多";
			pull = true;
		} else {
			text = "没有更多内容了";
		}
	} else {
		pageShow = "nothing";
		text = "没有更多内容了";
	}
	if (call) call({
		more,
		text,
		pull,
		pageShow
	})

	return "网络出现故障，请重新拉取";
}

//时间格式化
export const cctime = (time, type = "yyyy年mm月dd日 hh:mm") => {
	if (typeof (time) == "string" && time.indexOf("-") > -1) time = time.replace(/-/g, "/");
	let _time = new Date(time);
	let _year = _time.getFullYear();
	let _month = addZero(_time.getMonth() + 1);
	let _day = addZero(_time.getDate());
	let _hours = addZero(_time.getHours());
	let _mins = addZero(_time.getMinutes());
	let _seconds = addZero(_time.getSeconds());
	let _r = "";
	switch (type) {
		case "yyyy年mm月dd日 hh:mm":
			//2019-09-09 09:09 
			let _td = new Date();
			let _td1 = new Date(_td.getFullYear(), _td.getMonth(), _td.getDate());
			if (_td1.getFullYear() == _year) {
				//本年
				let _time1 = new Date(_year, _time.getMonth(), _time.getDate());
				let _xc = (_time1 - _td1) / 1000 / 60 / 60 / 24;
				if (_xc == 0 && (_td - _time) >= 0) {
					if ((_td - _time) <= 60 * 1000) {
						_r = `刚刚`;
					} else if ((_td - _time) <= 60 * 1000 * 60) {
						_r = `${Math.floor((_td - _time) / (1000 * 60))}分钟前`;
					} else {
						_r = `今天 ${_hours}:${_mins}`;
					}
				} else if (_xc == -1) {
					_r = `昨天 ${_hours}:${_mins}`;
				} else {
					_r = `${_month}月${_day}日 ${_hours}:${_mins}`;
				}
			} else {
				_r = `${_year}年${_month}月${_day}日 ${_hours}:${_mins}`;
			}
			break;
	}
	return _r;
}

//补零
export const addZero = (num) => {
	num = num.toString();
	if (num.length == 1) num = "0" + num;
	return num;
}

//数量格式化
export const ccnum = (num) => {
	let _r = num.toFixed(0);
	if (_r > 1000) _r = cckeepOneDecimalFull(_r / 10000) + "万";

	return _r;
}

//四舍五入保留2位小数（不够位数，则用0替补）
export const cckeepTwoDecimalFull = (num) => {
	let result = parseFloat(num);
	if (isNaN(result)) {
		return "0.00";
	}
	result = Math.round(num * 100) / 100;
	let s_x = result.toString();
	let pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += ".";
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += "0";
	}
	return s_x;
}

//四舍五入保留1位小数
export const cckeepOneDecimalFull = (num) => {
	let result = parseFloat(num);
	if (isNaN(result)) {
		return "0.0";
	}
	result = result.toFixed(1);
	return result;
}

//页面跳转
export const ccnavigateTo = (url) => {
	wx.navigateTo({
		url,
		fail() {
			cctoast("跳转错误，已达到小程序最大页面栈");
		}
	})
}