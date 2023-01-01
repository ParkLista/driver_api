const express = require('express');
const { resendVerificationOtpCode } = require('../controllers/driver');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/resend-otp', resendVerificationOtpCode);