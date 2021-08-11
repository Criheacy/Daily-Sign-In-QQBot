const { serve } = require('./serve');
const {
	onSignIn,
	onClearSignInList,
	onUpdateGroupUser
} = require('./database');

const {
	signInRemider, replyAfterSignIn, remindWhoHaveNotSignInYet
} = require('./tasks');

onUpdateGroupUser();

serve((data) => {
	console.log(`Receive [${data.message}] from ${data.sender.nickname}(${data.sender.card}) - ${data.sender.user_id})`);
	onSignIn(data.sender.user_id);
	replyAfterSignIn(data.sender);
})

setInterval(() => {
	remindWhoHaveNotSignInYet();
}, 5000);
