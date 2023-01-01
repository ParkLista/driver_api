const express = require('express');
const { register, getDriver, login } = require('../controllers/auth')
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)   

router.route('/profile')    
    .get(protect, getDriver)

module.exports = router;