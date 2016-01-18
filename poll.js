const crypto = require('crypto');

function Poll(pollData) {
  this.name = pollData.pollName;
  this.description = pollData.pollDescription;
  this.id = this.generateId(12);
  this.links_id = this.generateId(12);
  this.links_url = 'links/' + this.links_id;
  this.show_links_url = 'showLinks/' + this.links_id;
  this.poll_id = this.generateId(12);
  this.poll_url = 'poll/' + this.poll_id;
  this.show_poll_url = 'showPoll/' + this.poll_id;
  this.admin_id = this.generateId(12);
  this.admin_url = 'admin/' + this.admin_id;
  this.questions = pollData.questions;
  this.responses = {};
  this.respondants = {};
}

Poll.prototype.generateId = function(num) {
  return crypto.randomBytes(num).toString('hex');
}

Poll.prototype.recordResponse = function(message) {
  if(!this.respondants[message.responder]) {
    this.respondants[message.responder] = true;
    this.countResponses(message.poll_response);
  }
}

Poll.prototype.countResponses = function(pollResponse) {
  if(this.responses[pollResponse]) {
    this.responses[pollResponse]++;
  } else {
    this.responses[pollResponse] = 1;
  }
}

module.exports = Poll;
