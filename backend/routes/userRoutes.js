const express = require('express');
const router = express.Router();
const {
  emailController,
  getProjectsByUserEmail,
  getUserProfilePicByEmail,
  listProjectsByUserEmail,
  updateUserProfilePic,
  updateUsername,
} = require('../controllers/userController');

// Route to save user email and log activities
router.route('/email').post(emailController);

// Route to get projects by userEmail
router.route('/projects-list/:userEmail').get(getProjectsByUserEmail);

// Route to update user profile picture URL
router.route('/url/:userEmail/profile-pic').post(getUserProfilePicByEmail);
router.route('/:userId/profile-pic').put(updateUserProfilePic);

// Route to change the username from the settings page
router.route('/:userEmail/username').put(updateUsername);

module.exports = router;
