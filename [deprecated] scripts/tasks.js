const { sendGroupMessage } = require("./message-utils");
const { groupUserList, signInUserList } = require("./database");

const signInRemider = async () => {
	await sendGroupMessage("[CQ:at,qq=all] 请大家在群里签到");
	await sendGroupMessage("回复「签到」或「在宿舍」都视为有效");
}

const replyAfterSignIn = async (user) => {
	await sendGroupMessage(`[CQ:at,qq=${user.user_id}] 收到${
		user.card === "" ? user.user_id : user.card
	}的签到`);
}

const remindWhoHaveNotSignInYet = async () => {
	groupUserList, signInUserList
	const message = notSignInUserList.reduce((prev, user) => {
		return prev + `[CQ:at, qq=${user.user_id}]`;
	}, "") + "记得签到";
	await sendGroupMessage(message);
}

module.exports = {signInRemider, replyAfterSignIn, remindWhoHaveNotSignInYet};