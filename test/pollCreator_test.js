'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const PollCreator = require('../pollCreator');
const Poll = require('../poll');

var pollCreator = new PollCreator();
var pollParams = { pollName: 'test',
  pollDescription: 'test',
  questions: {
    question1: 'apple',
    question2: 'banana'
  },
  pollEnd: '08/22/2016 8:16 AM',
  showPollResults: 'Yes'
}

describe('PollCreator', function () {
  it('has a "polls" attribute that starts as an empty hash', function(done) {
    expect(pollCreator.polls).eql({});
    done();
  });

  it('can create and save a poll and find the poll by its id', function(done) {
    var poll = pollCreator.create(pollParams);
    expect(pollCreator.findPollById(poll.poll_id)).eql(poll);
    done();
  });

  it('can find a saved poll by the admin id', function(done) {
    var poll = pollCreator.create(pollParams);
    expect(pollCreator.findPollByAdminId(poll.admin_id)).eql(poll);
    done();
  });

  it('can find a saved poll by the links id', function(done) {
    var poll = pollCreator.create(pollParams);
    expect(pollCreator.findPollByLinksId(poll.links_id)).eql(poll);
    done();
  });
})
