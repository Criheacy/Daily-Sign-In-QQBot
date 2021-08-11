const { fetchRequest } = require('./fetch-request');
const config = require('./config');

const sendGroupMessage = async (message) => {
  console.log(`[SEND]: ${message}`);
  return fetchRequest("http://127.0.0.1:5700/send_group_msg", {
		data: {
			group_id: config.data.group_id,
      message: message
		}
	})
	.catch((error) => console.log(error));
}

const getGroupUserList = async () => {
	sendMessage("http://127.0.0.1:5700/get_group_member_list", {
    data: {
      group_id: config.data.group_id,
    }
	})
  .then((responseData) => {
    return responseData;
  });
}

module.exports = { sendGroupMessage, getGroupUserList };