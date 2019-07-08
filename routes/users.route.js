const settings = require('../settings/config');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/Users');


router.post('/login', (request,response) => {
    response.json({message: "login"})

})

router.post('/register', (request, response) => {
    response.json({message: "register"})

})


module.exports = router;