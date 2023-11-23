const r = require('../controllers/ratingController');
const express = require("express");
const app = express.Router();

app.post("/addRating", r.addRating);

module.exports = app;