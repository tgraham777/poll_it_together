var socket = io();

socket.on('connect', function () {
  console.log('You have connected!');
});
