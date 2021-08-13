const safeString = (text) => {
	return text.replace(/[\u0800-\uFFFF]/g, '');
}

module.exports = { safeString };