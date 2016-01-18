$(document).ready(function(){
  $('.poll-vote').on('click', function() {
    var pollResponse = $(this).closest("p").text().replace("Vote", "").replace(/\s+/g, "");
    sendPollResponse(pollResponse);
  });
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var pollId = window.location.pathname.split('/').last();

function sendPollResponse(pollResponse) {
  socket.send('voteCast', {
          pollId: pollId,
    pollResponse: pollResponse,
       responder: socket.id
  });
};
