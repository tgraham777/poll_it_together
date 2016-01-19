'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const Poll = require('../poll');

var pollParams = {
  pollName: 'test name',
  pollDescription: 'test description',
  questions: {
    question1: 'apple',
    question2: 'banana'
  },
  pollEnd: '08/22/2016 8:16 AM',
  showPollResults: 'Yes'
}
var poll = new Poll(pollParams);

describe('Poll', function () {
  it('stores a name attribute when correct params are passed in', function (done) {
    expect(poll.name).be.a('string');
    expect(poll.name).eql('test name');
    done();
  });

  it('stores a description attribute when correct params are passed in', function (done) {
    expect(poll.description).be.a('string');
    expect(poll.description).eql('test description');
    done();
  });

  it('stores a time_end attribute when correct params are passed in', function (done) {
    expect(poll.time_end).be.a('string');
    expect(poll.time_end).eql('08/22/2016 8:16 AM');
    done();
  });

  it('has an id 24 characters long', function (done) {
    expect(poll.id).be.a('string');
    expect(poll.id.length).eql(24);
    done();
  });

  it('has a links_id 24 characters long', function (done) {
    expect(poll.links_id).be.a('string');
    expect(poll.links_id.length).eql(24);
    done();
  });

  it('has a poll_id 24 characters long', function (done) {
    expect(poll.poll_id).be.a('string');
    expect(poll.poll_id.length).eql(24);
    done();
  });

  it('has an admin_id 24 characters long', function (done) {
    expect(poll.admin_id).be.a('string');
    expect(poll.admin_id.length).eql(24);
    done();
  });

  it('has a links_url that includes the links_id', function (done) {
    expect(poll.links_url).be.a('string');
    expect(poll.links_url).to.include('links/' + poll.links_id);
    done();
  });

  it('has a showLinks_url that includes the links_id', function (done) {
    expect(poll.show_links_url).be.a('string');
    expect(poll.show_links_url).to.include('showLinks/' + poll.links_id);
    done();
  });

  it('has a poll_url that includes the poll_id', function (done) {
    expect(poll.poll_url).be.a('string');
    expect(poll.poll_url).to.include('poll/' + poll.poll_id);
    done();
  });

  it('has a show_poll_url that includes the poll_id', function (done) {
    expect(poll.show_poll_url).be.a('string');
    expect(poll.show_poll_url).to.include('showPoll/' + poll.poll_id);
    done();
  });

  it('has an admin_url that includes the admin_id', function (done) {
    expect(poll.admin_url).be.a('string');
    expect(poll.admin_url).to.include('admin/' + poll.admin_id);
    done();
  });

  it('stores a questions attribute when correct params are passed in', function (done) {
    expect(poll.questions).eql({
      question1: 'apple',
      question2: 'banana'
    });
    done();
  });

  it('has an empty object to store responses', function (done) {
    expect(poll.responses).eql({});
    done();
  });

  it('has an empty object to store named responses', function (done) {
    expect(poll.name_responses).eql({});
    done();
  });

  it('has an empty object to store respondants', function (done) {
    expect(poll.respondants).eql({});
    done();
  });

  it('has a response_count attribute that defaults to zero', function (done) {
    expect(poll.response_count).eql(0);
    done();
  });
})
