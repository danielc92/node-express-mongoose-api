const express = require('express');
const PORT = process.env.PORT || 3002

// Third party logger
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


// Database settings
const mongoose = require('mongoose');
const { port, database, host, driver} = require('./settings/config');
const uri = `${driver}://${host}:${port}/${database}`

// Route settings
const routesCities = require('./routes/cities.route');


// [NOTE] Connect to mongodb using the uri provided
mongoose.connect(uri, { useNewUrlParser: true })


// [NOTE] Intiate express app
app = express()


// [NOTE] Log with morgan package
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/cities', routesCities);

// [NOTE] Listen on designated PORT for incoming requests
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))