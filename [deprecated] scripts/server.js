const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/', function (req, res) {
  const data = req.body;
  if (data.post_type && data.post_type === "message") {
    console.log(`Receive [${data.message}] from ${data.sender.nickname}`);
    console.log(data);
  }
  res.status(204).end();
})

const server = app.listen(9000, function () {
	const host = server.address().address
	const port = server.address().port

	console.log(`Listening at http://${host}:${port}`);
})