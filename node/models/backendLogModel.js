const mongoose = require("mongoose");

const backendSchema = mongoose.Schema({
    ErrorMessage: String,
    pageUrl: String,
    request: String,
},{timestamps: true});

module.exports = mongoose.model('BackendLogs', backendSchema);