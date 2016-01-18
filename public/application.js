var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

socket.on('connect', function(data){
  socket.emit('subscribe', {channel:'voteCast'});
});

socket.on('message', function(data) {
  console.log('received a message: ', data);
  // addMessage(data);
});

// function addMessage(data) {
//   $('.admin-poll-results').html(data);
// }
