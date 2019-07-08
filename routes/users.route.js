const settings = require('../settings/config');
const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();

const User = require('../models/Users');
