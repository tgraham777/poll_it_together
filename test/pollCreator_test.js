'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const PollCreator = require('../pollCreator');
const Poll = require('../poll');

var pollCreator = new PollCreator();

describe('PollCreator', function () {
  it('has a "polls" attribute that starts as an empty hash', function(done) {
    expect(pollCreator.polls).eql({});
    done();
  });

  xit('can create a poll', function(done) {
    var pollParams = { question: 'test poll',
      choices: {
        choice1: 'choice1'
      },
      timeout: {
        number: null,
        units: null
      }
    }
    var poll = dataStore.createPoll(pollParams);
    expect(dataStore.findPollByAdminId(poll.adminId)).eql(poll);
    done();
  });

  xit('can find saved polls by the pollId', function(done) {
    var pollParams = { question: 'test poll',
      choices: {
        choice1: 'choice1'
      },
      timeout: {
        number: null,
        units: null
      }
    }
    var poll = new Poll(pollParams);
    dataStore.polls[poll.adminId] = poll;
    expect(dataStore.findPollByPollId(poll.pollId)).eql(poll);
    done();
  });
})
