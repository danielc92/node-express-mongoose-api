const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { port, database, host, driver} = require('./settings/database');
const uri = `${driver}://${host}:${port}/${database}`

mongoose.connect(uri, { useNewUrlParser: true })

app = express()


app.get('/cities', (request, response) => {

    City.find({})
    .then(data=>response.json(data))
    .catch(error=>response.json({error}))

})


app.post('/cities', jsonParser, (request, response) => {

    let message = new City(
    {
        name: request.body.name,
        country: request.body.country,
        population: request.body.population
    })

    message.save()
    .then(doc => response.status(200).json({success:"Saved city"}))
    .catch(error => response.status(500).json({error}))
})


app.patch('/cities', jsonParser, (request, response) => {
    
    let match = { _id: request.body._id };
    let update = {}

    keys.forEach(key => {
        let value = request.body[key];
        if (value) {
            update[key] = value
        }
    })

    console.log(update)

    City.findOneAndUpdate(match, update)
    .then(result => response.status(200).json({success:result}))
    .catch(error => response.status(500).json({error}))

})

app.delete('/cities', jsonParser, (request, response) => {

    id = request.body._id;

    City.findByIdAndDelete({_id: id})
    .then(result => response.json({result}))
    .catch(error => response.json({error}))
})