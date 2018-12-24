// const net = require('net');
const https = require('https');
const fetch = require('node-fetch');
const express = require('express');
const requestToken = require('./auth');
const projectId = 'two-factor-ac76f';
var accessToken;

const deviceToken = 'd0QbhyO3v_4:APA91bHOqRKYQ1z_oTNhI7ai7xQ0eLJ2Eq5ZJV1PJS94pC6XhUCGPzp_CTovgFIWBabvtFx1Euu2PvGcVzGtCEzA1zxNoNuBaATsraafndy4smPq9h9rTi1r8F_cdkFgRvyJgtWq4bY4';
const app = express();

const createRequestBody = (title, body) => JSON.stringify({
  message: {
    token: deviceToken,
    android: {
      collapse_key: 'test_group',
      notification: { title, body, color: '#00ff00' }
    }
  }
});

app.get('/test', (req, res) => {
  if (!accessToken) {
    res.send('Invalid token')
    return;
  }

  fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + accessToken
    },
    body: createRequestBody('測試', '你好,世界')
  })
  .then(val => {
    return val.json()
  })
  .then(val => {
    console.log(val);
    res.send(JSON.stringify(val))
  })
  .catch(err => {
    console.log(err);
  });
});

requestToken().then(token => {
  accessToken = token;
  console.log('Received Token:', token.slice(0,5) + '...' + token.slice(-5));
  app.listen(3000, () => console.log('Listening on 8080'));
})



// Start TCP server
// const server = net.createServer((socket) => {
//   socket.write(new Date().toString());
// })
// server.listen(3000, () => {
//   console.log('Listening on 3000');
// });