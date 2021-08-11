let groupUserList = [];
let signInUserList = [];

const onSignIn = (newUserId) => {
	if (!signInUserList.find(userId => userId === newUserId)) {
		signInUserList.push(newUserId);
	}
}

const onClearSignInList = () => {
	signInUserList = [];
}

const onUpdateGroupUser = (newGroupUserList) => {
	groupUserList = newGroupUserList;
}

module.exports = {
	groupUserList,
	signInUserList,
	onSignIn,
	onClearSignInList,
	onUpdateGroupUser
};