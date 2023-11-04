const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const validateToken = require("../utils/auth_middlewares");
const requireRoles = require("../utils/role_auth");


router.post('/signUp', userController.signUp);
router.post('/logIn', userController.logIn);
//router.get('/userData', userController.allUsers);
//router.put('/updateUser/:id', userController.updateUser);
//router.delete('/deleteUser/:id', userController.deleteUser);
//router.get('/dashBoard', validateToken, requireRoles(['User']), userController.welcome);



module.exports = router;