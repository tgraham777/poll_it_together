var socket = io();

socket.on('usersConnected', function(count) {
  console.log('Connected users: ' + count);
});

Array.prototype.last = function(){
  return this[this.length - 1];
};

var adminId = window.location.pathname.split('/').last();
socket.on('responses-' + adminId, function(responses) {
  updatePollResults(responses);
});

function updatePollResults(responses) {
  var pollResults = $.map(responses, function(value, key){
    return '<p>' + key + ' - ' + value + '</p>'
  });

  $('#admin-poll-results').empty().append(pollResults);
}
