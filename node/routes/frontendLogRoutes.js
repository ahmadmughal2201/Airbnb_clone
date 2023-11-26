// frontendLogRoutes.js
const express = require("express");
const router = express.Router();
const frontendLogController = require("../controllers/frontendLogController");

router.post("/frontendLog", frontendLogController);

module.exports = router;
