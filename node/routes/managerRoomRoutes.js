const express = require("express");
const router = express.Router();
const managerController = require('../controllers/managerRoomController');


router.post('/add-manager-room', managerController.addManagerRoom);

module.exports = router;