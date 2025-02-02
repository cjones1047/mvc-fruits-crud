const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Fruit = require('../models/fruit.js')

// DELETE
router.delete('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        .then(fruit => {
            res.render('fruits/edit.liquid', { fruit })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const fruitId = req.params.id

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    res.render('fruits/new.liquid')
})

// seed route ---> has been moved to models/seed.js (now ran with 'npm run seed')
// insert many items into our database and clear out what's there with just going to this route
// localhost:3000/fruits/seed
// router.get('/seed', (req, res) => {
//     // starting data
//     const startFruits = [
//         { name: "Orange", color: "orange", readyToEat: false },
//         { name: "Grape", color: "purple", readyToEat: false },
//         { name: "Banana", color: "orange", readyToEat: false },
//         { name: "Strawberry", color: "red", readyToEat: false },
//         { name: "Coconut", color: "brown", readyToEat: false },
//     ]

//     // delete if we have fruits
//     Fruit.deleteMany({})
//         // insert data
//         .then(() => {
//             Fruit.create(startFruits)
//             // return this data as json to view
//             .then(data => {
//                 // res.json(data)
//                 res.redirect('/fruits')
//             })
//             // .catch (err => console.error(err))
//             .catch(console.error)
//         })
    
//     // return this data as json to view
// })

// POST - create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    
    // now that we have user-specific fruits, we'll add a username upon creation
    // remember, when we logged in, we saved the username to the session object
    // TODO: need to get a users ._id somehow and change this line
    req.body.owner = req.session.userId

    Fruit.create(req.body)
        .then(fruit => {
            console.log(fruit)
            // res.json(fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/fruits
router.get('/', (req, res) => {
    // mongoose to find all fruits
    Fruit.find({})
        .then(fruits => {
            // res.json(fruit) - return fruits as json
            res.render('fruits/index.liquid', { fruits })
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - show 'my' fruit
router.get('/mine', (req, res) => {
    // find the fruits associated with the logged-in user
    Fruit.find({ owner: req.session.userId })
        .then(fruits => {
            res.render('fruits/index.liquid', { fruits })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// GET - Show
// localhost:3000/fruits/:id
router.get('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        // populate our USer models fields
        // comment has an author field and that is the ref to the User model
        // always going to be a string of the value you want to populate
        // this also has to be another model
        .populate('comments.author')
        .then(fruit => {
            // res.json(fruit) 
            const userId = req.session.userId
            const username = req.session.username
            res.render('fruits/show.liquid', { fruit, userId , username})
        })
        .catch(err => {
            console.log(`Did you mean to make /${fruitId} go to a different route?`)
            res.json(err)
        })
})

// // seed route ----> MOVED TO ABOVE SHOW ROUTE TO STOP '/seed' FROM BEING TREATED LIKE AN INDEX 
// // insert many items into our database with just going to this route
// // localhost:3000/fruits/seed
// router.get('/seed', (req, res) => {
//     // starting data
//     const startFruits = [
//         { name: "Orange", color: "orange", readyToEat: false },
//         { name: "Grape", color: "purple", readyToEat: false },
//         { name: "Banana", color: "orange", readyToEat: false },
//         { name: "Strawberry", color: "red", readyToEat: false },
//         { name: "Coconut", color: "brown", readyToEat: false },
//     ]

//     // delete if we have fruits
//     Fruit.deleteMany({})
//         // insert data
//         .then(() => {
//             Fruit.create(startFruits)
//             // return this data as json to view
//             .then(data => {
//                 res.json(data)
//             })
//             // .catch (err => console.error(err))
//             .catch(console.error)
//         })
    
//     // return this data as json to view
// })

module.exports = router