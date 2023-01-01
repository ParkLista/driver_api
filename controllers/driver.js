const { sendVerificationMsg } = require('../middleware/verify/verify-otp');

/**
 * Resending the verification code
 */
exports.resendVerificationOtpCode = (res, req)=>{
    // sendVerificationMsg(phone_no);
    res.status(200).json({
        message: "Done!"
    })
}