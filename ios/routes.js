const http2 = require('http2');
const express = require('express');
const bodyParser = require('body-parser');
const generateToken = require('./auth');
const { Writable } = require('stream');

const jwtToken = generateToken();
const client = http2.connect('https://api.development.push.apple.com:443')
  .on('error', (err) => console.error(err));

const router = express.Router();

router.use(bodyParser.json());

router.post('/test', (req, res) => {
  console.log('Request from: ', req.body);
  const deviceToken = req.body.token;
  const h2Request = client.request({
    ':method': 'POST',
    ':scheme': 'https',
    ':path': `/3/device/${deviceToken}`,
    'authorization': 'bearer ' + jwtToken,
    'apns-priority': '10',
    'apns-topic': 'edu.gatech.wenqi.twofactor',
    'apns-collapse-id': 'test'
  });
  h2Request.setEncoding('utf8');
  let buffer = '';
  h2Request.on('data', chunk => buffer += chunk);
  h2Request.on('end', () => {
    res.send({ res: buffer });
    console.log('Response sent:', buffer);
  });
  h2Request.end(JSON.stringify({
    'aps': {
      'alert': {
        'title': 'TEST TITLE',
        'body': 'test body'
      },
      'badge': 10
    }
  }));
});

module.exports = router;
