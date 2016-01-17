const crypto = require('crypto');

function Poll(pollData) {
  this.name = pollData.pollName;
  this.description = pollData.pollDescription;
  this.id = this.generateId(12);
  this.links_url = 'links/' + this.generateId(12);
  this.show_links_url = 'showLinks/' + this.generateId(12);
  this.poll_url = 'poll/' + this.generateId(12);
  this.show_poll_url = 'showPoll/' + this.generateId(12);
  this.admin_url = 'admin/' + this.generateId(12);
  this.questions = pollData.questions;
  this.responses = {};
  this.respondants = {};
}

Poll.prototype.generateId = function(num) {
  return crypto.randomBytes(num).toString('hex');
}

module.exports = Poll;
