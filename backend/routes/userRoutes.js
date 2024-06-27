const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const { emailController ,test} = require('../controllers/userController');



router.route('/email').post(emailController).get(test);

module.exports = router;
