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
const cityRoutes = require('./routes/cities.route');
const userRoutes = require('./routes/users.route');

// [NOTE] Connect to mongodb using the uri provided
mongoose.connect(uri, { useNewUrlParser: true })
        .then(()=>console.log('Server connection with mongodb successful'))
        .catch(error => console.log(`An error has occured ${error}`))

// [NOTE] Intiate express app
app = express()


// [NOTE] Log with morgan package
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})
app.use(morgan('combined', { stream: accessLogStream }))

// Use routes
app.use('/api/cities', cityRoutes);
app.use('/api/auth/', userRoutes);

// [NOTE] Listen on designated PORT for incoming requests
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))