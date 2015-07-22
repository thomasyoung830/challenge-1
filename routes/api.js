var express = require('express');
var router = express.Router();
var models = require('../models');

/**
 * Check if user is logged in and return an error otherwise
 */
var requires_login = function(req, res, next) {
  // if (!req.isAuthenticated()) {
  //     res.status(401).json({'error': 'ENOTAUTH', 'message':'Endpoint requires login.'});
  //   } else {
  //     next();
  //   }

  // Disabled for now
  next();
};


/**
 * Endpoint to get information about logged in user
 *
 * Requires login
 */
router.get('/user_info', requires_login, function(req, res) {

  models.User.findOne({
    where: {
      id: req.user.id
    }
  })
  .then(function(user) {
    res.json(user.get({plain: true}));
  });

  //Mock data
  // var data = {
  //   'id': 1,
  //   'first_name': 'Randy',
  //   'last_name': 'Savage',
  //   'profile_image' : 'http://img.bleacherreport.net/img/images/photos/001/866/715/randy_savage_crop_north.png?w=377&h=251&q=75',
  // };

  // res.json(data);
});


/**
 * Endpoint to get a list of all users
 */
router.get('/allUsers', function(req, res) {

  models.User.findAll()
    .then(function(users) {
      var data = [];
      for(var i = 0; i < users.length; i++) {
        data.push({
          id: users[i].get('id'),
          first_name: users[i].get('first_name'),
          last_name: users[i].get('last_name'),
          email: users[i].get('email'),
          fb_id: users[i].get('fb_id'),
          createdAt: users[i].get('createdAt'),
          updatedAt: users[i].get('updatedAt')
        });
      }

      res.json(data);
    })
    .catch(function(err) {
      throw new Error('Failed to GET at /allUsers route: ', err);
    });

  // Mock data
  // var data = [{
  //       "id": 1,
  //       "first_name": "Randy",
  //       "last_name": "Savage",
  //       "profile_image" : "http://img.bleacherreport.net/img/images/photos/001/866/715/randy_savage_crop_north.png?w=377&h=251&q=75"
  //     },
  //     {
  //       "id": 2,
  //       "first_name": "Paul",
  //       "last_name": "Newman",
  //       "profile_image" : "http://i.dailymail.co.uk/i/pix/2008/09/28/article-1063705-02D517F700000578-321_468x524.jpg"
  //     }];

  // res.json(data);
});


/**
 * Endpoint to get a list of challenges associated with currently logged in user
 *
 * Requires login
 */
router.get('/challenge/user', requires_login, function(req, res) {
  // var data = req.db.Challenge.findByUser(req.user.id);

  var data = require('../specs/server/mock_challenge_list.json');

  res.json(data);
});


/**
 * Endpoint to get a list of public challenges
 */
router.get('/challenge/public', function(req, res) {
  // var data = req.db.Challenge.publicList();

  var data = require('../specs/server/mock_challenge_list.json');

  res.json(data);
});


/**
 * Endpoint to get single challenge specified by id
 */
router.get('/challenge/:id', function(req, res) {
  var target_id = parseInt(req.params.id);
  // var data = req.db.Challenge.findById(req.params.id);

  var data;
  require('../specs/server/mock_challenge_list.json').forEach(function(challenge) {
    if(challenge.id === target_id) {
      data = challenge;
      return;
    }
  });
  if (data === undefined) {
    res.status(400);
    data = {'error': 'ENOTFOUND', 'message': 'Could not find challenge with the id: ' + target_id};
  }

  res.json(data);
});


/**
 * Check if the submitted form has all required fields
 */
var challenge_form_is_valid = function(form) {
  var valid = true;
  var required_fields = ['title', 'message'];
  var min_text_length = 3;

  required_fields.forEach(function(field) {
    if (form[field] === '' || form[field].length < min_text_length) {
      valid = false;
    }
  });

  return valid;
};


/**
 * Endpoint to post a new challenge
 *
 * Requires login
 */
router.post('/challenge', requires_login, function(req, res) {
  var form = req.body;

  // CONSOLE LOG
  console.log(form);
  // CONSOLE LOG

  if (!challenge_form_is_valid(form)) {
    res.status(400).json({'error': 'EINVALID', 'message': 'Submitted form is invalid.'});
    return;
  }
  // models.User.findOne({where: {id: req.user.id}})
  //   .then(function(user) {

  // Create the challenge
      models.Challenge.create({
        title: form.title,
        message: form.message,
        wager: form.wager,
        creator: req.user.id,
        date_started: new Date()
      })
      .then(function(challenge) {
        models.User.findOne({
          where: {id: req.user.id}
        })
        // If creation succesful, link it to the creator and set creator's usersChallenges 'accepted' to true
        .then(function(user) {
          user.addChallenge(challenge, {accepted: true});
          // link it to each participant and set their usersChallenges 'accepted' to false (should be false by default)
          form.participants.forEach(function(userId) {
            models.User.findOne({where: {id: userId}})
              .then(function(user) {
                user.addChallenge(challenge, {accepted: false});
              });
          });

          // return 201 response with challenge object attributes
          res.status(201).json({
            id: challenge.id
          });
        });
      });

    // });

    // TODO: add catch statements to handle errors

  // req.db.Challenge.create({
  //   'title': form.title,
  //   'message': form.message,
  //   'wager': (form.wager !== undefined) ? form.wager : '',
  //   'creator': req.user.id
  // }).then(function(instance) {
  //   res.status(201).json({
  //     'id': instance.id,
  //     'title': instance.title,
  //     'message': instance.message,
  //     'wager': instance.wager,
  //     'url': instance.get_url()
  //   });
  // }, function(error) {
  //   res.status(500).json({'error': 'EUNKNOWN', 'message': 'Challenge could not be created'});
  // });


  // res.status(201).json({
  //   'id': 4,
  //   'title': form.title,
  //   'message': form.message,
  //   'wager': form.wager || '',
  //   'url': '/challenge/4'
  // });
});


/**
 * Endpoint to set a challenge to started
 *
 * Requires login
 */
router.put('/challenge/:id/started', requires_login, function(req, res) {
  var target_id = parseInt(req.params.id);

  // var query = {
  //   'where': {
  //     'id': target_id,
  //     'creator': req.user,
  //     'started': false
  //   }
  // };

  // req.db.Challenge.find(query).then(function(challenge) {
  //   challenge.started = true;
  //   challenge.date_started = Date.now();
  //   challenge.save().then(function() {
  //     res.json({'success':true});
  //   });
  // }, function(error) {
  //   res.status(400).json({'error': 'ENOTFOUND', 'message': 'Could not find appropriate challenge with the id: ' + target_id});
  // });

  var found = require('../specs/server/mock_challenge_list.json').some(function(challenge) {
    return (challenge.id === target_id && !challenge.started);
  });
  if (!found) {
    res.status(400).json({'error': 'ENOTFOUND', 'message': 'Could not find appropriate challenge with the id: ' + target_id});
  } else {
    res.json({'success': true});
  }
});


/**
 * Endpoint to set a winner and complete challenge
 *
 * Requires login
 */
router.put('/challenge/:id/complete', requires_login, function(req, res) {
  var target_id = parseInt(req.params.id);
  var winner = req.body.winner;

  // var query = {
  //   'where': {
  //     'id': target_id,
  //     'creator': req.user.id,
  //     'started': true,
  //     'complete': false
  //   }
  // };

  // req.db.Challenge.find(query).then(function(challenge) {
  //   challenge.complete = true;
  //   challenge.winner = winner;
  //   challenge.date_completed = Date.now();
  //   challenge.save().then(function() {
  //     res.json({'success':true});
  //   });
  // }, function(error) {
  //   res.status(400).json({'error': 'ENOTFOUND', 'message': 'Could not find appropriate challenge with the id: ' + target_id});
  // });

  var found = require('../specs/server/mock_challenge_list.json').some(function(challenge) {
    return (challenge.id === target_id && challenge.started && !challenge.complete);
  });
  if (!found) {
    res.status(400).json({'error': 'ENOTFOUND', 'message': 'Could not find appropriate challenge with the id: ' + target_id});
  } else {
    res.json({'success': true});
  }
});


router.put('/challenge/:id/accept', requires_login, function(req, res) {
  var target_id = parseInt(req.params.id);

  // var user_id = req.user.id;
  //
  // var query = {
  //   'where': {
  //     'ChallengeId': target_id,
  //     'UserId': req.user.id,
  //     'accepted': false
  //   }
  // };

  // req.db.UserChallenge.find(query).then(function(user_challenge) {
  //   user_challenge.accepted = true;
  //   user_challenge.save().then(function() {
  //     res.json({'success': true});
  //   });
  // }, function(error) {
  //   res.status(400).json({'error': 'ENOTFOUND', 'message': 'User not part of challenge or already accepted'});
  // });


  var user_id = 1;
  var data;
  require('../specs/server/mock_challenge_list.json').forEach(function(challenge) {
    if(challenge.id === target_id && !challenge.started) {
      data = challenge;
      return;
    }
  });
  if (data === undefined) {
    res.status(400).json({'error': 'ENOTFOUND', 'message': 'User not part of challenge or already accepted'});
  } else {
    var found = false;
    data.participants.forEach(function(user) {
      if (user.id === user_id && !user.accepted) {
        found = true;
        return;
      }
    });

    if (!found) {
      res.status(400).json({'error': 'ENOTFOUND', 'message': 'User not part of challenge or already accepted'});
    } else {
      res.json({'success': true});
    }
  }
});


module.exports = {
  'router': router,
  'challenge_form_is_valid': challenge_form_is_valid
};
