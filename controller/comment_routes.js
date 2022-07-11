const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Fruit = require('../models/fruit.js')

// POST - Creation
// localhost:3000/fruits/:fruitId <- A single Fruit can have many comments
router.post('/:fruitId', (req, res) => {
    const fruitId = req.params.fruitId
    req.body.author = req.body.userId

    Fruit.findById(fruitId)
        // after we found a fruit
        // take that fruit and add the comment
        .then(fruit => {
            // single fruit doc there is a field called comments
            fruit.comments.push(req.body)

            // if we change a doc, we have to return and call .save() on the doc
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE - delete yeeting

module.exports = router