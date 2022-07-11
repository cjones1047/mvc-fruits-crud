const mongoose = require('./connection')

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // single User
        ref: 'User' // string value from the model creation
    }
}, {
    timestamps: true
})

module.exports = commentSchema