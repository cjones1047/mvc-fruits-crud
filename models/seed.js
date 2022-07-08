///////////////////////////////////////////
// This model runs on 'npm run seed'
///////////////////////////////////////////

///////////////////////////////////////////
// Import Dependecies
///////////////////////////////////////////
const mongoose = require('./connection')
const Fruit = require('./fruit')

////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection

// this runs the callback function when the db connection is opened from this file
db.on('open', () => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: true },
        { name: "Coconut", color: "brown", readyToEat: true },
    ]

    // when we 'seed' data, we usually clear out the db first
    Fruit.remove({})
    // then, we create the data
        .then(deletedFruits => {
            console.log('this is what remove returns', deletedFruits)

            // now that our delete was successful, we can create our fruits
            Fruit.create(startFruits)
                .then(data => {
                    console.log('the new fruits', data)
                    db.close()
                })
                .catch(error => {
                    console.log('error:', error)
                    db.close()
                })

        })
        .catch(error => {
            console.log('error:', error)
            db.close()
        })
    // whether it's successful or not, we want to close our db connection
})