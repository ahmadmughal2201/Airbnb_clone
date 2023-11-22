const guestController = require('../controllers/payingGuestController');
const express = require("express");
const app = express.Router();


app.post("/addGuest", guestController.addGuest);

module.exports = app;