// Send Verification code to sms
exports.sendVerificationMsg = (phone_no)=>{
    try {
        const client = require('twilio')( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN )
        client.verify.v2
            .services(process.env.VERIFY_SERVICE_SID)
            .verifications
            .create({ 'to': `+${phone_no}`, channel: 'sms' })
            .then(verification => console.log(verification.status))
            .catch(e => {
                console.log(`Verification error: ${e}`)
                res.status(500).send(`Verification error: ${e}`)
            })
        res.status(200).json({
            message: 'We have sent a six digit code to your phone, check and verify your account'
        })
    } catch (error) {
        console.log(`Errors: ${error}`)
    }
}

