const { sendGroupMessage } = require("./message-utils");

const signInRemider = async () => {
	await sendGroupMessage("大家好，我是负责接任倪诗宇负责智能班签到统计的机器人")
	await sendGroupMessage("[CQ:at,qq=all] 请大家在群里签到");
	await sendGroupMessage("回复「签到」或「在宿舍」都视为有效");
}
