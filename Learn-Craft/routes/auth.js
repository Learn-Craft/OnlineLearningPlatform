const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

console.log('Auth routes loaded'); // Debug message

router.post('/register', (req, res, next) => {
    console.log('Register route hit'); // Debug message
    next();
}, register);

router.post('/login', (req, res, next) => {
    console.log('Login route hit'); // Debug message
    next();
}, login);

module.exports = router;
