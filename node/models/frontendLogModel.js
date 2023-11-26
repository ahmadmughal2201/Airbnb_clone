const mongoose = require("mongoose");

const frontendSchema = mongoose.Schema({
    ErrorMessage: String,
    pageUrl: String,
    portal: String,
},{timestamps: true});

module.exports = mongoose.model('FrontendLog', frontendSchema);