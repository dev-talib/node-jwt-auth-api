const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authController = {}

authController.signup = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ message: 'Email already exists' });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                newUser.save()
                    .then(user => {
                        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                        res.status(201).json({token: token, user: {id: user._id, email: user.email, name: user.name }});
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Error creating user' });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error creating user' });
        });
    
};

authController.login = async function(req, res) {
    const user = await User.findOne({ $or : [{ email: req.body.email }, { username: req.body.email }] });
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await (user.password === req.body.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    console.log(token);
    res.status(200).json({ token: token, user: {id: user._id, email: user.email, name: user.name } });

};   

module.exports = authController;