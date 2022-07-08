/////////////////////////////////////////
// First, import dependencies
/////////////////////////////////////////
const mongoose = require('./connection')

/////////////////////////////////////////
// define user model
/////////////////////////////////////////
// pull the schema and model fconstructors from mongoose
// here, we'll use destructuring syntax to accomplish this
// destructuring syntax ---> looks at object, then pulls whatever lives in that object and saves to variables 
const { Schema, model } = mongoose

// console.log('this is schema:', Schema)
// console.log('this is model:', model)

//make a user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true // so no two users can have the same username
    },
    password: {
        type: String,
        required: true
    }

})

// make a user model with the user schema
const User = model('User', userSchema)

/////////////////////////////////////////
// export user model
/////////////////////////////////////////
module.exports = User