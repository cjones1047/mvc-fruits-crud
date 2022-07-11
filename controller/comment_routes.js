const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Fruit = require('../models/fruit.js')

// POST - Creation
// localhost:3000/comments/:fruitId <- A single Fruit can have many comments
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
router.delete('/delete/:fruitId/:commentId', (req, res) => {
    const fruitId = req.params.fruitId
    const commentId = req.params.commentId

    Fruit.findById(fruitId) // single fruit doc, and inside a fruit doc wewill have many comments
        .then(fruit => {
            const comment = fruit.comments.id(commentId)

            // remove comment
            comment.remove()

            // since I've changed the 'comments' field by one, I've got to return that comment
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruitId}`)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router