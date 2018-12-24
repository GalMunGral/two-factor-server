// const net = require('net');
const { google } = require('googleapis');
const key = require('./service-account.json');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null, // keyFile
  key.private_key,
  ['https://www.googleapis.com/auth/firebase.messaging'], // scopes
  null,
);

jwtClient.authorize((err, token) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('token:', token);
});


// Start TCP server
// const server = net.createServer((socket) => {
//   socket.write(new Date().toString());
// })
// server.listen(3000, () => {
//   console.log('Listening on 3000');
// });