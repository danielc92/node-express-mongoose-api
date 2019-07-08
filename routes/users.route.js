const settings = require('../settings/config');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/Users');


router.post('/login', (request,response) => {

    User.findOne({email: request.body.email})
        .then(user => {
            if (user) {
                return bcrypt.compare(request.body.password, user.password)
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


router.post('/register', async(request, response) => {

    let user = await User.findOne({email: request.body.email})
    console.log('user: ', user)
    if (user) return response.status(400).json({message: 'This email is taken.'})

    user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

    user.password = await bcrypt.hash(user.password, settings.bcrypt_iterations)
    await user.save();

    const token = user.makeToken();
    response.header(token).json({
        message: "Account has been created."
    })
})


module.exports = router;