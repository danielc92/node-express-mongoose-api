const mongoose = require('mongoose');

// [NOTE] Mongoose schema has many advantages, such as validation and ease of use over the regular mongodb driver
const CitySchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    country: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    population: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000000
    }

});


// [NOTE] Export the model so that the server.js can import and use it.
module.exports = mongoose.model('City', CitySchema)