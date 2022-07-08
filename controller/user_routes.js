/////////////////////////////////////////
// First, import dependencies
/////////////////////////////////////////
const express = require('express')
const User = require('../models/user.js')
// bcrypt is used to hash(read: encrypt) passwords
const bcrypt = require('bcryptjs')

/////////////////////////////////////////
// Create a router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// list out our routes
/////////////////////////////////////////
// two sign up routes
// one GET to show the form
router.get('/signup', (req, res) => {
    res.render('users/signup.liquid')
})
// one POST to make the db request

// two login routes
// one GET to show the form
// one POST to login and create the session

// logout route
// can be a GET that calls destroy on our session
// we can add an 'are you sure' page if there is time


/////////////////////////////////////////
// export our router
/////////////////////////////////////////
module.exports = router