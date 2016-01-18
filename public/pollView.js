var socket = io();

$(document).ready(function(){
  $('.poll-vote').on('click', function() {
    var pollResponse = $(this).closest("p").text().replace("Vote", "").trim();
    sendPollResponse(pollResponse);
  });
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var pollId = window.location.pathname.split('/').last();

function sendPollResponse(pollResponse) {
  socket.send('votes', {
       responder: socket.id,
         poll_id: pollId,
   poll_response: pollResponse
  });
};

socket.on('pollClosed', function() {
  $('#poll-view-page').empty().append('<h2>Poll Closed</h2>');
});
