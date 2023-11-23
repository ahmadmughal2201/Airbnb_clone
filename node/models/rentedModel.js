const mongoose = require('mongoose');

const rented = mongoose.Schema({
    CID: String,
    RID: String,
    RentedDate: Date,
    CheckedInDate: Date,
    DueDate: Date,
    CheckedOutDate: Date,
    Rent: Number,
    Status: Boolean,
}, {timestamps: true});



module.exports = mongoose.model('Rented', rented);
