const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    console.log(error)
    error.message = err.message;
    // Mongoose Bad ObjectId
    if(err.name === 'CastError'){
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }
    // Mongoose Duplicate Key
    if(err.code ===  11000 && err.keyPattern.username){
        const message = `The username you are using is already taken`;
        error = new ErrorResponse(message, 400);
    }

    // Duplicate email
    if(err.code ===  11000 && err.keyPattern.email){
        const message = `The email you are using is already taken`;
        error = new ErrorResponse(message, 400);
    }

    if(err.code ===  11000 && err.keyPattern.telephone){
        const message = `The telephone you are using is already taken`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}
module.exports = errorHandler;