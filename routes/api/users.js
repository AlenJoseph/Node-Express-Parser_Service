const express = require('express');
const router = express.Router();

//Load User model

const User = require('../../model/User');

// @route   GET api/users/test
// @desc    Test users route
// @acess   Public
router.get('/test', (req, res) => {
  res.send({ msg: 'it works' });
});

module.exports = router;
