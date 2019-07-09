// [NOTE] Intiate express app
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('./middleware/cors');
app.use(cors);


const PORT = process.env.PORT || 3002;

// [NOTE] Log with morgan package
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a'})
app.use(morgan('combined', { stream: accessLogStream }))


// Database settings
const mongoose = require('mongoose');
const { db_port, db_name, db_driver, db_host} = require('./settings/config');
const uri = `${db_driver}://${db_host}:${db_port}/${db_name}`


// Route settings
const cityRoutes = require('./routes/cities.route');
const userRoutes = require('./routes/users.route');
app.use('/api/cities', cityRoutes);
app.use('/api/auth', userRoutes);


// [NOTE] Connect to mongodb using the uri provided
mongoose.connect(uri, { useNewUrlParser: true })
        .then(()=>console.log('Server connection with mongodb successful'))
        .catch(error => console.log(`An error has occured ${error}`))


// [NOTE] Listen on designated PORT for incoming requests
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))