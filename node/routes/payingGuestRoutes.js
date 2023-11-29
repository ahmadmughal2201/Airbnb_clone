const guestController = require('../controllers/payingGuestController');
const express = require("express");
const app = express.Router();

app.post("/addGuest", guestController.addGuest);

app.put("/updateWallet/:customerId", guestController.middleFunction);

app.get("/getWallet/:customerId", guestController.check);

module.exports = app;