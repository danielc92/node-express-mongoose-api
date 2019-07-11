const settings = require('../settings/config');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/Users');
const router = express.Router();


router.post('/login', async (request,response) => {

    if (!request.body.email || !request.body.password) return response.status(400).json({message: "You need to supply an email and password."})

    let user = await User.findOne({email: request.body.email})
                         .then(user => user)
                         .catch(error => error)

    if (!user) return response.status(400).json({message: "Email does not exist."})

    let comparison = await bcrypt.compare(request.body.password, user.password)
                                .then(result => result)
                                .catch(error => error)

    if (!comparison) return response.status(400).json({message: "Incorrect credentials, try again."})

    const token = await user.makeToken()
    response.status(200).json({...token, message: "You have successfully logged in."})
});



/*
Registeration route has multiple steps
- Check if the email exists, if not return 400 status code, else continue
- Create new user object with request.body and validate using inbuilt mongoose method
- Return 400 status code if the validation failed, else continue
- Hash the password using bcrypt
- Save the user object to MongoDB
- Send a response to the user upon successful account creation
*/
router.post('/register', async(request, response) => {

    let user = await User.findOne({email: request.body.email})

    if (user) return response.status(400).json({message: 'This email is taken.'})

    user = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    })

    let validation_errors = await user.validate()
                                      .then(result => result)
                                      .catch(error => error)

    if (validation_errors) return response.status(400).json({
        message: "Validation has failed", 
        validation_errors
    })

    user.password = await bcrypt.hash(user.password, settings.bcrypt_iterations)
    await user.save();

    const token = user.makeToken();

    response.header(token).json({
        message: "Account has been successfully created.",
        user: { 
            email: user.email, 
            createdAt: user.createdAt
        }
    })
})


module.exports = router;