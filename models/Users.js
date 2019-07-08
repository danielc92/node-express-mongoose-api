const mongoose = require('mongoose');
const settings = require('../settings/config');
const validator = require('validator');

console.log(settings);

userSchema = mongoose.Schema({
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


