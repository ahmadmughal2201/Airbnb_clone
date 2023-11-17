const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const validateToken = require("../utils/auth_middlewares");
const requireRoles = require("../utils/role_auth");




router.post('/signUp', userController.signUp);
router.post('/logIn', userController.logIn);
router.post('/getId', userController.getUserIdByEmailAndPassword);
//router.get('/idGet', userController.getUserIdByEmail());
//router.get('/userData', userController.allUsers);
//router.put('/updateUser/:id', userController.updateUser);
//router.delete('/deleteUser/:id', userController.deleteUser);
//router.get('/dashBoard', validateToken, requireRoles(['User']), userController.welcome);


module.exports = router;


/*
module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require('multer');
const roomModel = require('../models/roomModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});


const upload = multer({ storage: storage });

router.post('/upload-Room', upload.single("upload"), async (req, res) => {
    console.log("File uploaded successfully");
    try {
        // Assuming you are storing the uploaded file information in your roomModel
        const newRoom = await roomModel.create({
            // Use req.file to get the uploaded file details
            file: req.file, // Assuming 'file' is a field in your roomModel

            // Other fields from the request body
            // Example: name: req.body.name,
        });
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
});

module.exports = router;*/






