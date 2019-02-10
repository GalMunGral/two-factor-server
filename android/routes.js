const express = require('express');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const key = require('./service-account.json');

const PROJECT_ID = 'two-factor-ac76f';
const TAG = '[[android]]:';
var FCMaccessToken;

const router = express.Router();
users = [];

router.post('/device-token', (req, res) => {
  if (!(req.body.token && req.body.username)) {
    req.send({ error: "Missing username/token" })
  }
  users[0] = {
    username: req.body.username,
    token: req.body.token
  };
  console.log(TAG, `registered user ${req.body.username}'s token`)
  res.send({ result: "OK" });
})

router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)
  if (!username || !password) {
    res.send({ err: "Incorrect username/password!"});
    return;
  }
  if (!FCMaccessToken) {
    res.send('stupid');
  }
  fetch(`https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + FCMaccessToken
    },
    body: JSON.stringify({
      message: {
        token: users[0].token,
        data: {
          sessionId: 'test'
        }
      }
    })    
  })
  .then(() => res.send({ success: true }))
  .then(() => console.log('Push notification sent!'))
  .catch(err => console.log(TAG, err));
});

// Initialize
requestToken().then(token => {
  FCMaccessToken = token;
  logToken(token);
});

function requestToken() {
  return new Promise((resolve, reject) => {

    const jwtClient = new google.auth.JWT(
      key.client_email, // from FCM service account
      null, // keyFile
      key.private_key, // from FCM service account
      ['https://www.googleapis.com/auth/firebase.messaging'], // scopes
      null, // ?
    );

    jwtClient.authorize((err, tokens) => {
      if (err) { reject(err); return; }
      resolve(tokens.access_token);
    });
  });
}

// const createRequestBody = (deviceToken, title, body) => JSON.stringify({
//   message: {
//     token: deviceToken,
//     android: {
//       collapse_key: 'test_group',
//       notification: { title, body, color: '#00ff00' }
//     }
//   }
// });

function logToken(token) {
  console.log(TAG, 'Received FCM Token:', token.slice(0,6) + '...' + token.slice(-5));
}

module.exports = router;
