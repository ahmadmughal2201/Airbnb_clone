const mongoose = require('mongoose');

const payingGuestSchema = mongoose.Schema({
    CID: String,
    Status: Boolean,
    Wallet: Number,
}, {timestamps: true});



module.exports = mongoose.model('PayingGuest', payingGuestSchema);
