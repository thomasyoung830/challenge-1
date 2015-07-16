var express = require('express');
var router = express.Router();

router.post('/login');
router.get('/logout');

router.get('/auth/facebook');
router.get('/auth/facebook/callback');

router.get('/user_info');

router.get('/challenge/user');
router.get('/challenge/public');
router.get('/challenge/:id');
router.post('/challenge');

module.exports = router;
