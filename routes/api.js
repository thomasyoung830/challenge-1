var express = require('express');
var router = express.Router();

router.post('/login');
router.get('/logout');

router.get('/auth/facebook');
router.get('/auth/facebook/callback');


/**
 * Endpoint to get information about logged in user
 *
 * Requires login
 */
router.get('/user_info', function(req, res) {
  /**
   * Check if user is logged in and return an error if not
   */
  // if (!req.isAuthenticated) {
  //   res.status(401).json({'error':'Endpoint requires login.'});
  //   return;
  // }

  /**
  * Object returned from endpoint
  */
  // var data = {
  //   'first_name': req.user.first_name,
  //   'last_name': req.user.last_name,
  //   'profile_image' : req.user.profile_image,
  // };

  // Mock data
  var data = {
    // 'id': 1,
    'first_name': 'Randy',
    'last_name': 'Savage',
    'profile_image' : 'http://img.bleacherreport.net/img/images/photos/001/866/715/randy_savage_crop_north.png?w=377&h=251&q=75',
  };
  res.json(data);
});


/**
 * Endpoint to get a list of challenges associated with currently logged in user
 *
 * Requires login
 */
router.get('/challenge/user', function(req, res) {
  /**
   * Check if user is logged in and return an error if not
   */
  // if (!req.isAuthenticated) {
  //   res.status(401).json({'error':'Endpoint requires login.'});
  //   return;
  // }

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
    data = {'error': 'Could not find challenge with the id: ' + target_id};
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
router.post('/challenge', function(req, res) {
  /**
   * Check if user is logged in and return an error if not
   */
  // if (!req.isAuthenticated) {
  //   res.status(401).json({'error':'Endpoint requires login.'});
  //   return;
  // }
  
  var form = req.body;

  if (!challenge_form_is_valid(form)) {
    res.status(400).json({'error': 'Submitted form is invalid.'});
  }

  // req.db.Challenge.create({
  //   'title': form.title,
  //   'message': form.message,
  //   'wager': (form.wager !== undefined) ? form.wager : '',
  //   'creator': req.user
  // }).then(function(instance) {
  //   res.status(201).json({
  //     'id': instance.id,
  //     'title': instance.title,
  //     'message': instance.message,
  //     'wager': instance.wager,
  //     'url': instance.get_url()
  //   });
  // }, function(error) {
  //   res.status(500).json({'error': 'Challenge could not be created'});
  // });


  res.status(201).json({
    'id': 4,
    'title': form.title,
    'message': form.message,
    'wager': form.wager || '',
    'url': '/challenge/4'
  });
});

module.exports = {
  'router': router,
  'challenge_form_is_valid': challenge_form_is_valid
};
