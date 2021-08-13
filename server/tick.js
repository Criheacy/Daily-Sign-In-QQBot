const { group_id } = require('./qq-config');
const { httpRequest } = require('./request');
const qs = require('qs');
const { signInMessageCheck } = require('./sign-in-check');

const SERVER_URL = "http://10.102.32.57:5702";

const messageRequest = (message) => {
	const data = {
		message: message
	}
	const url = `${SERVER_URL}/send_group_message?${qs.stringify(data)}`;

	return httpRequest(url).then((result) => {
		console.log(`[SEND MESSAGE] "${message}"`);
		return Promise.resolve(result);
	}).catch((error) => {
		console.error(`[ERROR] error occurred when sending "${message}"`);
		console.log(error);
		return Promise.reject(error);
	});
}

const updateGroupUserRequest = () => {
	const url = `${SERVER_URL}/update_group_member_list`;

	return httpRequest(url).then((result) => {
		console.log(`[UPDATE GROUP USER]`);
		return Promise.resolve(result);
	}).catch((error) => {
		console.error(`[ERROR] error occurred when updating group user`);
		console.log(error);
		return Promise.reject(error);
	});
}

const signInListRequest = () => {
	const current = new Date();
	const data = {
		date: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
	}
	const url = `${SERVER_URL}/get_sign_in_list?${qs.stringify(data)}`;

	return httpRequest(url).then((result) => {
		console.log(`[FETCH SIGN-IN LIST]`);
		return Promise.resolve(result);
	}).catch((error) => {
		console.error(`[ERROR] error occurred when fetching sign-in list`);
		console.log(error);
		return Promise.reject(error);
	});
}

const getUnsignInUserId = (signInData) => {
	console.log(signInData);
	return signInData.map((item) => {
		return item.sign_in_type ? null : item.user_id;
	}).reduce((prev, item) => {
		return item ? [...prev, item] : prev;
	}, []);
}

const getTimeOfToday = (hour, minute = 0, second = 0, milliseconds = 0) => {
	const current = new Date();
	return new Date(current.getFullYear(), current.getMonth(), current.getDate(),
		hour, minute, second, milliseconds);
}

const callEveryDay = (callback, hours, minutes, seconds) => {
	let interval = getTimeOfToday(hours, minutes, seconds).getTime()
		- (new Date()).getTime();
	if (interval < 0) {
		interval += 24 * 60 * 60 * 1000;
	}

	setTimeout(() => {
		callback();
		setInterval(() => {
			callback();
		}, 24 * 60 * 60 * 1000);
	}, interval);
}

callEveryDay(async () => {
	await messageRequest("[CQ:at,qq=all] 请大家在群里签到");
	await messageRequest("发送「签到」或「在宿舍」都视为有效");
}, 22, 0, 0);

callEveryDay(async () => {
	await updateGroupUserRequest();
}, 21, 50, 0);

callEveryDay(async () => {
	await signInListRequest().then((data) => {
		const obj = JSON.parse(data);
		const unsignedUserList = getUnsignInUserId(obj);

		if (unsignedUserList.length !== 0) {
			messageRequest(unsignedUserList.map((user_id) => {
				return `[CQ:at,qq=${user_id}]`;
			}, "").join(" ") + "请还未签到的同学记得签到");
		} else {
			messageRequest(`签到人数（${obj.length}/${obj.length}）已完成，感谢配合！`);
		}
	}).catch((error) => {
		console.log(error);
	})
}, 23, 0, 0);