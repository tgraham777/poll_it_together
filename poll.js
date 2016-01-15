const crypto = require('crypto');

function Poll(pollData) {
  this.name = pollData.name;
  this.id = this.generateId(12);
  this.admin_id = this.generateId(12);
  this.admin_url = 'admin/' + this.admin_id;
  this.poll_id = this.generateId(12);
  this.poll_url = 'poll/' + this.poll_id;
  this.questions = pollData.questions;
  this.responses = {};
  this.respondants = {};
}

Poll.prototype.generateId = function(num) {
  return crypto.randomBytes(num).toString('hex');
}

module.exports = Poll;