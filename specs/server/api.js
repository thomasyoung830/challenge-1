var expect = require('chai').expect;
var request = require('request');
var http = require('http');

var app = require('../../app');

describe('Api tests', function() {
  before(function(done) {
    app.set('port', 3030);
    var server = http.createServer(app);
    server.listen(3030);
    server.on('listening', function() {
      console.log('Listening on ' + 3030);
      done();
    });
    server.on('error', function(error) {
      console.error(error);
    });
  });

  describe('Unauthenticated routes', function() {
    it('should retrieve a specific challenge', function(done) {
      request({'uri':'http://localhost:3030/api/1/challenge/1', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.id).to.equal(1);
        expect(body.participants.length).to.be.above(0);
        done();
      });
    });

    it('should retrieve a list of public challenges', function(done) {
      request({'uri':'http://localhost:3030/api/1/challenge/public', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('array');
        expect(body[0].participants.length).to.be.above(0);
        done();
      });
    });
  });

  xdescribe('Authenticated routes', function() {
    // YEAH RIGHT FACBOOK LOGIN
    // it('should be able to sign up for an account', function(done) {

    // });
    // it('should be able to login', function(done) {

    // });

    it('should be able to retrieve user info', function(done) {
      request({'uri':'http://localhost:3030/api/1/user_info', 'json':true}, function(err, res, body) {
        // tests here
        done();
      });
    });

    it('should be able to retrieve a list of challenges associated with currently logged in user', function(done) {
      request({'uri':'http://localhost:3030/api/1/challenge/user', 'json':true}, function(err, res, body) {
        // tests here
        done();
      });
    });

  });

});
