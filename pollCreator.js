const Poll = require('./poll');

function PollCreator() {
  this.poll = {};
}

PollCreator.prototype.create = function(pollData) {
  var poll = new Poll(pollData);
  this.poll = poll;
  return poll;
}

module.exports = PollCreator;
