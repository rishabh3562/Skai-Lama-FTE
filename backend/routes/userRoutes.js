const express = require('express');
const router = express.Router();
const { emailController, getProjectsByUserEmail, listProjectsByUserEmail, updateUserProfilePic } = require('../controllers/userController');

// Route to save user email and log activities
router.route('/email').post( emailController);

// Route to get projects by userEmail
router.route('/projects/:userEmail').get( getProjectsByUserEmail);

// Route to list projects of a user by email
// router.route('/projects-list/:email').get( listProjectsByUserEmail);

// Route to update user profile picture URL
router.route('/:userId/profile-pic').put( updateUserProfilePic);


module.exports = router;
