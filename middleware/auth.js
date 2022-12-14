const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Driver = require('../models/Driver');

// protect routes
exports.protect = asyncHandler(async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token = req.cookies.token
    // }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.driver = await Driver.findById(decoded.id);
        next();
    }
    catch(err){
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }
})