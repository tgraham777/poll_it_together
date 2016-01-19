'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var server = require('../server.js');

describe('server.js', function () {
  it('GET "/" should return a 200 response', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('GET "/badurl" should return a 404 response', function(done) {
    request(server)
      .get('/badurl')
      .expect(404, done);
  });

  it('POST "/badurl" should return a 404 response', function(done) {
    request(server)
      .post('/badurl')
      .expect(404, done);
  });

  it('POST "/" without all required data re-renders root page (w/ flash errors)', function(done) {
    request(server)
      .post('/')
      .type('form')
      .send( {
        pollName: '',
        pollDescription: 'test',
        questions: {
          question1: 'apple',
          question2: 'banana'
        },
        pollEnd: '08/22/2016 8:16 AM',
        showPollResults: 'Yes'
      } )
      .end(function(error, response) {
        expect(response.header['location']).to.eq('/');
        done();
      });
  });

  it('POST "/" with required data and "No" to showPollResults creates poll and redirects to links page', function(done) {
    request(server)
      .post('/')
      .type('form')
      .send( {
        pollName: 'test',
        pollDescription: 'test',
        questions: {
          question1: 'apple',
          question2: 'banana'
        },
        pollEnd: '08/22/2016 8:16 AM',
        showPollResults: 'No'
      } )
      .end(function(error, response) {
        expect(response.header['location']).to.include('/links');
        done();
      });
  });

  it('POST "/" with required data and "Yes" to showPollResults creates poll and redirects to showLinks page', function(done) {
    request(server)
      .post('/')
      .type('form')
      .send( {
        pollName: 'test',
        pollDescription: 'test',
        questions: {
          question1: 'apple',
          question2: 'banana'
        },
        pollEnd: '08/22/2016 8:16 AM',
        showPollResults: 'Yes'
      } )
      .end(function(error, response) {
        expect(response.header['location']).to.include('/showLinks');
        done();
      });
  });
});
