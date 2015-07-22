var expect = require('chai').expect;
var request = require('request');
var http = require('http');

process.env.DATABASE_URL = 'sqlite://test.sqlite';
process.env.TESTING = true;

var app = require('../../app');
var models = require('../../models');

var api_request = request.defaults({
  'jar': true,
  'baseUrl': 'http://localhost:3030'
});

describe('Api integration tests', function() {
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
      var uri = '/api/1/challenge/1';
      api_request({'uri':uri, 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.id).to.equal(1);
        expect(body.participants.length).to.be.above(0);
        done();
      });
    });

    it('should retrieve a list of public challenges', function(done) {
      var uri = '/api/1/challenge/public';
      api_request({'uri':uri, 'json':true}, function(err, res, body) {
        expect(body).to.be.an('array');
        expect(body[0].participants.length).to.be.above(0);
        done();
      });
    });
  });

  describe('Authenticated routes', function() {
    // YEAH RIGHT FACBOOK LOGIN
    // it('should be able to sign up for an account', function(done) {

    // });
    // it('should be able to login', function(done) {

    // });

    before(function(done) {
      models.User.bulkCreate([{
        'id': 1,
        'first_name': 'Randy',
        'last_name': 'Savage',
        'fb_id': '1'
      }, {
        'id': 2,
        'first_name': 'Paul',
        'last_name': 'Newman',
        'fb_id': '2'
      }]).then(function() {
        api_request({'uri': '/auth/login'}, function(err, res, body) {
          done();
        });
      });
    });

    after(function(done) {
      models.orm.drop().then(function() {
        done();
      });
    });

    xit('should be able to retrieve a list of challenges associated with currently logged in user', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/user';
      request({'uri':uri, 'json':true}, function(err, res, body) {
        // tests here
        done();
      });
    });

    it('should be able to create a new challenge', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge';
      var data = {
        'title': 'There is text here',
        'message': 'Here as well'
      };

      request({'uri':uri, 'method':'POST', 'json':data}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.id).to.be.a('number');
        expect(body).to.have.all.keys(['id', 'title', 'message', 'wager', 'url']);
        done();
      });
    });


    it('should be able to start a challenge', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/3/started';

      request({'uri':uri, 'method':'PUT', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.success).to.be.true;
        done();
      });
    });

    it('shouldn\'t be able to start a challenge that has already been started', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/1/started';

      request({'uri':uri, 'method':'PUT', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(['error', 'message']);
        done();
      });
    });
  
    it('should be able to complete a challenge', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/2/complete';
      var data = {'winner': 1};

      request({'uri':uri, 'method':'PUT', 'json':data}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.success).to.be.true;
        done();
      });
    });

    it('shouldn\'t be able to complete a challenge that has already been completed', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/1/complete';

      request({'uri':uri, 'method':'PUT', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(['error', 'message']);
        done();
      });
    });

    it('should be able to accept a challenge', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/3/accept';

      request({'uri':uri, 'method':'PUT', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body.success).to.be.true;
        done();
      });
    });

    it('shouldn\'t be able to accept a challenge that has already been accepted', function(done) {
      var uri = 'http://localhost:3030/api/1/challenge/2/accept';

      request({'uri':uri, 'method':'PUT', 'json':true}, function(err, res, body) {
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(['error', 'message']);
        done();
      });
    });

  });

});

describe('Api unit tests', function() {
  it('should validate challenge creation form', function() {
    var challenge_form_is_valid = require('../../routes/api').challenge_form_is_valid;

    var valid_form = {
      'title': 'There is text here',
      'message': 'Here as well'
    };
    var invalid_form = {
      'title': '',
      'message': ''
    };
    var mixed_form = {
      'title': 'There is text here',
      'message': ''
    };
    var under_min_length = {
      'title': 'hi',
      'message': 'There is text here'
    };

    var expected_results = [true, false, false, false];

    [valid_form, invalid_form, mixed_form, under_min_length].forEach(function(form, i) {
      expect(challenge_form_is_valid(form)).to.eql(expected_results[i]);
    });

  });
});
