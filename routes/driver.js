const express = require('express');
const { addDriver, getDriver } = require('../controllers/driver')

const router = express.Router();

router.route('/')
    .post(addDriver)
    .get(getDriver)

module.exports = router;