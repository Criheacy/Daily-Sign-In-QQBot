const signInMessageCheck = (message, ambiguous = false) => {
	if (message.length >= 100) {
		return false;
	}

	return (message === "签到" || message === "在宿舍") 
		|| (ambiguous && (message.contains("签到") || message.contains("在宿舍")));
}

module.exports = { signInMessageCheck };