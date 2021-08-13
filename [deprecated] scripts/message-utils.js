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

module.exports = { sendGroupMessage };

// sendMessage("http://127.0.0.1:5700/get_group_member_list", {
//   data: {
//     group_id: 710956426,
//   }
// })
//   .then((responseData) => {
//     const parsedData = responseData.data;
//     for (let item of parsedData) {
//       console.log({
//         card: item.card,
//         level: item.level,
//         nickname: item.nickname,
//         role: item.role,
//         sex: item.sex,
//         title: item.title
//       });
//     }
//   });