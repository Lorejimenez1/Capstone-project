'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {User} = require('../models/userModel');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
// process the signup form
router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
