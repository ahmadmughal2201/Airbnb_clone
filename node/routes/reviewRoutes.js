const r = require('../controllers/reviewController');
const express = require("express");
const app = express.Router();

app.post("/addReview", r.addReview);

app.get("/getReviews/:roomId", r.allReviews);


module.exports = app;