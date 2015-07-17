var express = require('express');
var router = express.Router();
var passport = require('../middleware/passport');


router.get('/logout');

router.get('/login', passport.authenticate('facebook', {'scope': ['email', 'user_friends']}));
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    'failureRedirect': '/login',
    'successRedirect': '/',
  })
);

module.exports = {
  'router': router
};
