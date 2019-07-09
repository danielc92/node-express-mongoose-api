const City = require('../models/Cities');
const cityFields = ['population', 'country', 'name'];
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');


// [NOTE] This route allows users to retrieve the list of cities from the database using a GET request
router.get('/', (request, response) => {

    let query = request.query

    City.find({})
    .then(data=>response.json(data))
    .catch(error=>response.json({error}))
})


// [NOTE] This route will allow users to create a new city with a POST request
router.post('/', auth, (request, response) => {

    let message = new City(
    {
        name: request.body.name,
        country: request.body.country,
        population: request.body.population
    })

    message.save()
    .then(doc => response.status(200).json({success:"Saved city"}))
    .catch(error => response.status(400).json({error}))
})


// [NOTE] This route allows uses to update documents using a PATCH request, given an id
router.patch('/', auth, (request, response) => {
    
    const locate_id = request.body._id
    if (!locate_id) return response.status(400).json({message: "No _id was provided."})
    
    let updates = {}

    cityFields.forEach(key => {
        let value = request.body[key];
        if (value) { updates[key] = value }})

    updates['updatedAt'] = Date.now()

    City.findByIdAndUpdate(locate_id, updates)
    .then(result => response.status(200).json({success:result}))
    .catch(error => response.status(400).json({error}))

})


// [NOTE] This route allows user to delete a document from the city model, given an id
router.delete('/', auth, (request, response) => {

    id = request.body._id;

    City.findByIdAndDelete({_id: id})
    .then(result => response.json({result}))
    .catch(error => response.json({error}))
})


module.exports = router;