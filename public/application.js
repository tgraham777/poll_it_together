var socket = io();

socket.on('connect', function () {
  console.log('You have connected!');
});

$(document).ready(function(){
  $('.poll-question').on('click', function() {
    var pollResponse = $(this).text();
    sendPollResponse(pollResponse);
  });
});
