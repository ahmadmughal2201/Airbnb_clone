const mongoose = require('mongoose');

const rating = mongoose.Schema({
    CID: String,
    RID: String,
    Rating: Number,
    Status: Boolean
}, {timestamps: true});



module.exports = mongoose.model('Ratings', rating);
