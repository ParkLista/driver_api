const Driver = require('../models/Driver');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 *  * @Desc Add a new taxi to the database
 */
exports.addDriver = asyncHandler(async(req, res, next)=>{
    const driver = await Driver.create(req.body);
    res.status(201).json({
        success: true,
        message: 'A Driver has been added successfully',
        driver
    });
});

/**
 * @Desc Get all the available taxis in the database
 */


exports.getDriver = asyncHandler(async(req, res, next)=>{
    const driver = await Driver.find();
    return res.status(200).json({
        success: true,
        message: 'Driver Profile',
        driver
    })
})