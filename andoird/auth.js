const { google } = require('googleapis');
const key = require('./service-account.json');

function requestAccessToken() {
  return new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null, // keyFile
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'], // scopes
      null,
    );

    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

module.exports = requestAccessToken;
