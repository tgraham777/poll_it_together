const crypto = require('crypto');

function Poll(pollData) {
  this.name = pollData.pollName;
  this.description = pollData.pollDescription;
  this.id = this.generateId(12);
  this.created_on = new Date();
  this.time_end = pollData.pollEnd;
  this.links_id = this.generateId(12);
  this.links_url = 'links/' + this.links_id;
  this.show_links_url = 'showLinks/' + this.links_id;
  this.poll_id = this.generateId(12);
  this.poll_url = 'poll/' + this.poll_id;
  this.show_poll_url = 'showPoll/' + this.poll_id;
  this.admin_id = this.generateId(12);
  this.admin_url = 'admin/' + this.admin_id;
  this.questions = pollData.questions;
  this.name_responses = {};
  this.respondants = {};
  this.responses = {};
  this.response_count = 0;
}

Poll.prototype.generateId = function(num) {
  return crypto.randomBytes(num).toString('hex');
};

Poll.prototype.recordResponse = function(message) {
  if(!this.respondants[message.responder]) {
    this.response_count++;
    this.respondants[message.responder] = true;
    this.addNameResponse(message.pollee_name, message.poll_response);
    this.addCountResponse(message.poll_response);
  }
};

Poll.prototype.addNameResponse = function(polleeName, pollResponse) {
  if(polleeName !== '') {
    this.name_responses[polleeName] = pollResponse;
  }
};

Poll.prototype.addCountResponse = function(pollResponse) {
  if(this.responses[pollResponse]) {
    this.responses[pollResponse]++;
  } else {
    this.responses[pollResponse] = 1;
  }
};

module.exports = Poll;
