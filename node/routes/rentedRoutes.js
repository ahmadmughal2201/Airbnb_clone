const rController = require('../controllers/rentedController');
const express = require("express");
const app = express.Router();


app.post("/addRented", rController.addRented);

module.exports = app;