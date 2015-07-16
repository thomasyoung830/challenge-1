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

  // var challenges = req.db.Challenge.findByUser(req.user.id);

  var data = require('../specs/server/mock_challenge_list.json');

  res.json(data);
});


/**
 * Endpoint to get a list of public challenges
 */
router.get('/challenge/public', function(req, res) {
  // var challenges = req.db.Challenge.publicList();

  var data = require('../specs/server/mock_challenge_list.json');

  res.json(data);
});


router.get('/challenge/:id');
router.post('/challenge');

module.exports = router;
