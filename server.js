//==============================
// import dependencies
//==============================

// this allows us to load our env variables
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const fruitRoutes = require('./controller/fruit_routes.js')
const userRoutes = require('./controller/user_routes.js')

//==============================
// Create our express application object
//==============================
const app = require('liquid-express-views')(express())

//==============================
// Middleware
//==============================
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))

// all of fruitRoutes will go through '/fruits'
app.use('/fruits', fruitRoutes)

// all of userRoutes will go through '/users'
app.use('/users', userRoutes)

//==============================
// Routes
//==============================
app.get('/', (req, res) => {
	res.send('your server is running, better go catch it')
})

//==============================
// Server Listener
//==============================
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})
