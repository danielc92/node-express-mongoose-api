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
