var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

$(document).ready(function(){
  $('#end-poll').on('click', function() {
    $('#admin-poll-closed').empty().append('<h2>Poll is now closed.</h2>');
    socket.send('endPoll', {
      message: "Poll Closed"
    });
  });

  var timeEnd = $('#time-end').text();
  if(Date.parse(timeEnd) > Date.parse(new Date())) {
    var timeinterval = setInterval(function() {
      var t = Date.parse(timeEnd) - Date.parse(new Date());
      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      var days = Math.floor( t/(1000*60*60*24) );

      var clock = $('#admin-time-clock');
      clock.empty().append(days + ' days, ' +
                           hours + ' hours, ' +
                           minutes + ' minutes, ' +
                           seconds + ' seconds');
      if(t <= 0){
        clearInterval(timeinterval);
        $('#admin-poll-closed').empty().append('<h2>Poll is now closed.</h2>');
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

socket.on('responses', function(responses) {
  updatePollResults(responses);
});

function updatePollResults(responses) {
  var pollResults = $.map(responses, function(value, key){
    return '<p>' + key + ' - ' + value + '</p>';
  });

  $('#admin-poll-results').empty().append(pollResults);
}
