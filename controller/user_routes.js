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
router.post('/signup', async (req, res) => {
    console.log('this is our initial request body:', req.body)
    // first, we need to encrypt our password
    // that's why we made this an 'async' function
    // because the password hashing takes a little time, we want to wait until it's done before things progress
    // we need to wait for bcrypt to run its 'salt rounds' (genSalt) before continuing
    // "salt rounds" are like saying "encrypt this x amount of times before settling on one encryption"
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    // now that our password is hashed, we can create a user
    console.log('this is our request body AFTER hashing:', req.body)
    User.create(req.body)
        // if created successfully, will redirect to the login page
        // if creationg UNsuccessful, send the error
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

// two login routes
// one GET to show the form
router.get('/login', (req, res) => {
    res.render('users/login.liquid')
})
// one POST to login and create the session

// logout route
// can be a GET that calls destroy on our session
// we can add an 'are you sure' page if there is time


/////////////////////////////////////////
// export our router
/////////////////////////////////////////
module.exports = router