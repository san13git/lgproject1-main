const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginUser=require('../controllers/userController');

router.post('/submit', userController.registerUser);  //end point
router.post('/login', userController.loginUser);

module.exports = router;