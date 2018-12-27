const express = require('express');
const fetch = require('node-fetch');
const requestToken = require('./auth');
const { createRequestBody } = require('./utilities');
const projectId = 'two-factor-ac76f';
const deviceToken = 'd0QbhyO3v_4:APA91bHOqRKYQ1z_oTNhI7ai7xQ0eLJ2Eq5ZJV1PJS94pC6XhUCGPzp_CTovgFIWBabvtFx1Euu2PvGcVzGtCEzA1zxNoNuBaATsraafndy4smPq9h9rTi1r8F_cdkFgRvyJgtWq4bY4';
const TAG = '[[android]]:';

const router = express.Router();

requestToken().then(accessToken => {
  console.log(TAG, 'Received FCM Token:', accessToken.slice(0,6) + '...' + accessToken.slice(-5));

  router.post('/test', (req, res) => {
    fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + accessToken
      },
      body: createRequestBody(deviceToken, '測試', '你好,世界')
    })
    .then(() => res.send({ success: true }))
    .catch(err => console.log(TAG, err));
  });

});

module.exports = router;
