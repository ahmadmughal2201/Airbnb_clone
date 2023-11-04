const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : String,
    lastName: String,
    role: String,
    email: String,
    password: String,
    DOB: Date
}, {timestamps: true});



module.exports = mongoose.model('User', userSchema);
