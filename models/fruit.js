// using an already connected mongoose NOT a fresh one from node_modules
const mongoose = require('./connection.js')

// inside of mongoose, I want the keys named 'Schema' and 'model' to be used without specifying 'mongoose', so I'm using this destructuring syntax
const { Schema, model } = mongoose

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
}, {
    timestamp: true
})

// need to make a model
// this COLLECTION will be called 'fruits' (lowercase, plural of 'Fruit')
const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit
