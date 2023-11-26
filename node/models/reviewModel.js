const mongoose = require('mongoose');

const review = mongoose.Schema({
    CID: String,
    RID: String,
    Review: String,
    Status: Boolean
}, {timestamps: true});



module.exports = mongoose.model('Reviews', review);
