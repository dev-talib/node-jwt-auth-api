const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController');

router.post('/signup', (req, res) => {
   authController.signup(req, res);
});

router.post('/login', async(req, res) => {
    authController.login(req,res);
});




module.exports = router;