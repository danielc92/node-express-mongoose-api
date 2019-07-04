const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 3001
const { port, database, host, driver} = require('./settings/database');
const uri = `${driver}://${host}:${port}/${database}`
const City = require('./models/Cities');
const cityFields = Object.keys(City.schema.obj);


// [NOTE] Connect to mongodb using the uri provided
mongoose.connect(uri, { useNewUrlParser: true })


// [NOTE] Intiate express app
app = express()


// [NOTE] Log with morgan package
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})
app.use(morgan('combined', { stream: accessLogStream }))


// [NOTE] This route allows users to retrieve the list of cities from the database using a GET request
app.get('/cities', (request, response) => {

    let query = request.query

    City.find(query)
    .then(data=>response.json(data))
    .catch(error=>response.json({error}))
})


// [NOTE] This route will allow users to create a new city with a POST request
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


// [NOTE] This route allows uses to update documents using a PATCH request, given an id
app.patch('/cities', jsonParser, (request, response) => {
    
    let match = { _id: request.body._id };
    let update = {}

    cityFields.forEach(key => {
        let value = request.body[key];
        if (value) {
            update[key] = value
        }
    })

    City.findOneAndUpdate(match, update)
    .then(result => response.status(200).json({success:result}))
    .catch(error => response.status(500).json({error}))

})


// [NOTE] This route allows user to delete a document from the city model, given an id
app.delete('/cities', jsonParser, (request, response) => {

    id = request.body._id;

    City.findByIdAndDelete({_id: id})
    .then(result => response.json({result}))
    .catch(error => response.json({error}))
})


// [NOTE] Listen on designated PORT for incoming requests
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))