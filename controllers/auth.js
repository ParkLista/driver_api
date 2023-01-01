const Driver = require('../models/Driver');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { sendVerificationMsg } = require('../middleware/verify/verify-otp');

/**
 *  @Desc Add a new driver to the database & return json token
 *  @route POST /api/zazu/v1/driver
 *  @access Public
 */
exports.register = asyncHandler(async(req, res, next)=>{
    const { firstname, lastname, username, telephone, email, password } = req.body;

    const driver = await Driver.create({
        firstname,
        lastname,
        username,
        telephone,
        email,
        password
    });    
    sendVerificationMsg(telephone);
    sendTokenResponse(driver, 201, msg);
});

/**
 *  @Desc Login the driver and return a token
 *  @route POST /api/zazu/v1/driver
 *  @access Public
 */
 exports.login = asyncHandler(async(req, res, next)=>{

    const { email, password } = req.body;
    // validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    // Check for the user
    const driver = await Driver.findOne({email}).select('+password');
    if(!driver){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Check if password matches
    const isMatch = await driver.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    sendTokenResponse(driver, 200, res);
});


/**
 * @Desc Get all the available taxis in the database
 */
exports.getDriver = asyncHandler(async(req, res, next)=>{
    const driver = await Driver. findById(req.driver.id);
    return res.status(200).json({
        success: true,
        message: 'Driver Profile',
        driver
    })
})


// Get token from model, create cookie and send response
const sendTokenResponse = (driver, statusCode, res)=>{
    const token = driver.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}


