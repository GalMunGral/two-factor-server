const net = require('net');

// Start TCP server
const server = net.createServer((socket) => {
  socket.write('Hello\n');
})
server.listen(2000, '127.0.0.1', () => {
  console.log('Listening on 2000');
});