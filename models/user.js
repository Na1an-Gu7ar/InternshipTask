const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/todoapp")

const userSchema = mongoose.Schema({
    title: String,
    description: String,
    tag: String,
})

module.exports = mongoose.model('user', userSchema)