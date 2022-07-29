const Taxi = require('../models/Driver');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


/**
 * @Desc Add a new taxi to the database
 */
exports.addDriver = asyncHandler(async(req, res, next)=>{
    const taxi = await Taxi.create(req.body);
    res.status(201).json({
        success: true,
        message: 'A Driver has been added successfully',
        data: taxi
    });
});

/**
 * @Desc Get all the available taxis in the database
 */
exports.getDrivers = asyncHandler(async(req, res, next)=>{
    const taxis = await Taxi.find();
    return res.status(200).json({
        success: true,
        message: 'All Drivers available',
        data: taxis
    })
})