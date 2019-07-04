const mongoose = require('mongoose');

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

module.exports = mongoose.model('City', CitySchema)