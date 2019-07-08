const settings = require('../settings/config');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/Users');


router.post('/login', (request,response) => {
    const {email, password} = request.body

    User.findOne({email})
        .then(user => {
            if (user) {
                return bcrypt.compare(password, user.password)
                      .then(result => {
                          if (result) {
                              const token = user.makeToken();
                              response.json(token);
                          } else {
                              response.status(400).json({message: "Invalid credentials. Try Again."})
                          }
                      })
                      
            } else {
                response.status(400).json({message: "Invalid credentials. Try Again."})
            }
        }).catch(error => {
            console.log(error);
        });
});

router.post('/register', (request, response) => {
    response.json({message: "register"})

})


module.exports = router;