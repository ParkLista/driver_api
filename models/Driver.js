const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
        
},{
    toJSON: { virtuals: true },
    // toObject: {virtuals: true }
});


module.exports = mongoose.model('Driver', DriverSchema);