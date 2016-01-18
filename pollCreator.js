const Poll = require('./poll');
const _ = require('lodash');

function PollCreator() {
  this.polls = {};
}

PollCreator.prototype.create = function(pollData) {
  var poll = new Poll(pollData);
  this.polls[poll.admin_id] = poll;
  return poll;
}

PollCreator.prototype.findPollByLinksId = function(id) {
  return _.find(_.values(this.polls), function(poll) {
    return poll.links_id === id;
  })
}

PollCreator.prototype.findPollById = function(id) {
  return _.find(_.values(this.polls), function(poll) {
    return poll.poll_id === id;
  })
}

PollCreator.prototype.findPollByAdminId = function(id) {
  return _.find(_.values(this.polls), function(poll) {
    return poll.admin_id === id;
  })
}

module.exports = PollCreator;
