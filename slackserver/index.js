const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.post('/response', (req, res) => {
  console.log('RESPONSE: ', JSON.stringify(req.body, null, 2));
  return res.status(200).send({});
});

server.listen(3192, () => {
  console.log('Listening for messages on :3192');
});
