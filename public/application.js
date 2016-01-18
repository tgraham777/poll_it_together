var socket = io();

socket.on('usersConnected', function (count) {
  console.log('Connected users: ' + count);
});

socket.on('message', function (message) {
  console.log('Something came along on the "message" channel:', message.text);
});
