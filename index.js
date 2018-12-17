const net = require('net');

// Start TCP server
const server = net.createServer((socket) => {
  socket.write(new Date().toString());
})
server.listen(3000, () => {
  console.log('Listening on 3000');
});