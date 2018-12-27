const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(__dirname + '/AuthKey_PZQK85QBM4.p8');
const { keyId, teamId } = require('./config');
const payload = { iss: teamId };
const options = { algorithm: 'ES256', keyid: keyId };
const TAG = '[[ios]]:';

function generateToken() {
  const token = jwt.sign(payload, privateKey, options);  // string
  console.log(TAG, 'JWT token generated:', token.slice(0,5) + '...' + token.slice(-5));
  console.log(TAG, 'JWT token decoded:', jwt.decode(token, options));
};

module.exports =  generateToken;
