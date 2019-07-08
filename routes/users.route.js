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

    User.findOne({email: request.body.email})
    if (user) return response.status(400).json({message: 'This email is taken.'})

    user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

    user.password = bcrypt.hash(user.password, settings.bcrypt_iterations)
    user.save();

    response.json({message: "Account has been created."})
})


module.exports = router;