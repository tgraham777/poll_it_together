var socket = io();

$(document).ready(function(){
  $('.poll-vote').on('click', function() {
    var pollResponse = $(this).closest("p").text().replace("Vote", "").trim();
    var polleeName = $('#pollee-name').val();
    sendPollResponse(pollResponse, polleeName);
  });

  var timeEnd = $('#time-end').text();
  if(Date.parse(timeEnd) > Date.parse(new Date())) {
    var timeinterval = setInterval(function() {
      var timeEnd = $('#time-end').text();
      var t = Date.parse(timeEnd) - Date.parse(new Date());
      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      var days = Math.floor( t/(1000*60*60*24) );

      var clock = $('#show-poll-view-time-clock');
      clock.empty().append(days + ' days, ' +
                           hours + ' hours, ' +
                           minutes + ' minutes, ' +
                           seconds + ' seconds');
      if(t <= 0){
        clearInterval(timeinterval);
        $('#show-poll-view-page').empty().append('<h2>Poll is now closed.</h2>');
      }
    }, 1000);
  } else {
    $('#poll-end').hide();
    $('#time-remaining').hide();
  }
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var pollId = window.location.pathname.split('/').last();

function sendPollResponse(pollResponse, polleeName) {
  socket.send('votes', {
       responder: socket.id,
         poll_id: pollId,
   poll_response: pollResponse,
     pollee_name: polleeName
  });
}

socket.on('responses', function(responses) {
  updatePollResults(responses);
});

function updatePollResults(responses) {
  var pollResults = $.map(responses, function(value, key){
    return '<p>' + key + ' - ' + value + '</p>';
  });

  $('#poll-results').empty().append(pollResults);
}

socket.on('pollClosed', function() {
  $('#show-poll-view-page').empty().append('<h2>Poll is now closed.</h2>');
});
