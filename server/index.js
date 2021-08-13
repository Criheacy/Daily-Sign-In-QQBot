const express = require('express');
const cors = require('cors');
const qs = require('qs');
const mysql = require('mysql');

const { connectionConfig } = require('./mysql-config');
const { httpRequest } = require('./request');
const { safeString } = require('./utils');
const { signInMessageCheck } = require('./sign-in-check');
const { group_id } = require('./qq-config');

const API_URL = "http://10.102.32.57:5700";
const app = express();

const connection = mysql.createConnection(connectionConfig);

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(cors({
	origin: '*'
}));

app.get('/send_group_message', (req, res) => {
	console.log("group_message received!");
	console.log(req.query);

	const data = req.query;
	data.group_id = group_id;
	const url = `${API_URL}/send_group_msg?${qs.stringify(data)}`;

	httpRequest(url).then((data) => {
		res.send(data).end();
	}).catch((error) => {
		res.status(400).send(error).end();
	});
})

app.get('/get_sign_in_list', (req, res) => {
	console.log("get_sign_in_list received!");
	console.log(req.query);

	const data = req.query;
	let queryCondition = "";

	if (data.date) {
		queryCondition = ` WHERE date BETWEEN '${data.date} 00:00:00' ` +
						` AND '${data.date} 23:59:59'`;
	}

	const queryStatement = `SELECT user.user_id, user_card, sign_in_type ` + 
		` FROM user LEFT OUTER JOIN` +
		` (SELECT DISTINCT user_id, sign_in_type FROM sign_in_log ${queryCondition}) log` +
		` ON user.user_id = log.user_id` +
		` WHERE user.user_id NOT IN (SELECT user_id FROM user_excluded)`;
	
	connection.query(queryStatement,
		(error, result) => {
			if (result) {
				res.send(result).end();
			}
			if (error) {
				res.status(400).send(error).end();
			}
		})
})

app.get('/update_group_member_list', (req, res) => {
	console.log("group_query received!");
	console.log(req.query);

	const data = req.query;
	data.group_id = group_id;
	const url = `${API_URL}/get_group_member_list?${qs.stringify(data)}`;

	httpRequest(url).then((responseData) => {

		console.log(responseData);

		// Update database
		obj = JSON.parse(responseData);
		const sqlQueryString = "INSERT INTO user (user_id, user_card) VALUES " +
			obj.data.map((user) => {
				return `('${user.user_id}', '${user.card}')`
			}).join(', ');

		console.log(sqlQueryString);

		connection.query(`DELETE FROM user`);
		if (obj.data.length !== 0) {
			connection.query(sqlQueryString, (error, result) => {
				if (result) {
					res.send({ code: 0, message: "success" }).end();
				} else if (error) {
					res.status(400).send(error).end();
				}
			})
		}

	}).catch((error) => {
		res.status(400).send(error).end();
	});
})

app.post('/', (req, res) => {
	const data = req.body;
	if (data.post_type && data.post_type === "message") {
		console.log(`Receive [${data.message}] from ${data.sender.nickname}(${data.sender.card}) - ${data.sender.user_id}`);

		if (+data.group_id === +group_id && signInMessageCheck(data.message)) {
			console.log(`${data.sender.card}(${data.sender.user_id}) Sign In`);

			const date = new Date();
			const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			const signInType = "sign_in";

			connection.query(`INSERT INTO sign_in_log (record_id, user_id, date, sign_in_type, origin_message) VALUES (NULL, '${data.sender.user_id}', '${dateString}', '${signInType}', '${data.message}')`),
				(error, result, fields) => {
					if (error) {
						console.log(error);
					}
				}
		} else if (signInMessageCheck(data.message), true) {
			console.warn("Unsuccessfully sign in");
		}
	}
	res.send({ code: 0, message: "success" });
	res.status(200).end();
})

const server = app.listen(5702, () => {
	const port = server.address().port

	console.log(`Server listening at port ${port}`);
})
