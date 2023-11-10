const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uName : String,
    role: String,
    email: String,
    password: String,
    DOB: Date,
    Status: Boolean,
}, {timestamps: true});



module.exports = mongoose.model('User', userSchema);
