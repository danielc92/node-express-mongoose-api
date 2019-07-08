const mongoose = require('mongoose');
const settings = require('../settings/config');
const validator = require('validator');

console.log(settings);

UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type:String,
        required:true,
        trim:true,
        minlength: 5,
        maxlength: 255,
        validate: [validator.isEmail, 'Incorrect email format.']
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength: 6,
        maxlength: 255
    },
    isAdmin: {
        type:Boolean
    }
})

UserSchema.methods.makeToken = function () {

    const tokenHash = jwt.sign(
        {
            _id: this._id
        },
        settings.token_secret,
        {
            expiresIn: settings.token_expiry_seconds
        }
    )

    const token = {
        "x-auth-token": tokenHash,
        "expiry-in-seconds": settings.token_expiry_seconds
    }

    return token;
}

module.exports = mongoose.model('User', UserSchema)


