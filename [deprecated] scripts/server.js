const express = require('express');
const app = express();
const config = require('./config');

const serve = (onMessageReceived) => {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  app.post('/', function (req, res) {
    const data = req.body;
    if (data.post_type && data.post_type === "message") {
      if (data.group_id && +data.group_id === +config.data.group_id) {
        console.log(`Receive [${data.message}] from ${data.sender.nickname}(${data.sender.card}) - ${data.sender.user_id})`);
        onMessageReceived(data);
      }
    }
    res.send({code: 0, message: "success"});
    res.status(200).end();
  })

  const server = app.listen(9000, function () {
    const host = server.address().address
    const port = server.address().port

    console.log(`Listening at http://${host}:${port}`);
  })
}

module.exports = { serve };