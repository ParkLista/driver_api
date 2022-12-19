const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const DriverSchema = new Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Please add a first name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        lastname: {
            type: String,
            required: [true, 'Please add a last name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        username: {
            type: String,
            required: [true, 'Please add a Username'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        telephone: {
            type: String,
            unique: true,
            required: [true, 'Please add a Username'],
            maxlength: [20, 'Phone number can not be longer than 20 characters']
        },
        email: {
            type: String,
            required: [true, 'Please add a Username'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        password: {
            type: String,
            required: [ true, 'Please add a password'],
            minlength: 6,
            select: false
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },{
        toJSON: { virtuals: true },
        // toObject: {virtuals: true }
    });

    // Encrypt the password before being saved to the database using bcryptjs
    DriverSchema.pre('save', async function(next){
        // In case the profile is just updated without changing the password field
        if(!this.isModified('password')){
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    });

    // Sign JWT and return token
    DriverSchema.methods.getSignedJwtToken = function(){
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
    }

    // Match Driver entered password to hashed password
    DriverSchema.methods.matchPassword = async function(enteredPassword){
        return  await bcrypt.compare(enteredPassword, this.password);
    }

module.exports = mongoose.model('Driver', DriverSchema);