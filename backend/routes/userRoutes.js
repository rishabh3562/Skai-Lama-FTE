const express = require('express');
const router = express.Router();
const { emailController, getUserEmailFromProjectId, getProjectsByUserEmail, listProjectsByUserEmail } = require('../controllers/userController');

// Route to save user email and log activities
router.route('/email').post(emailController);

// Route to get user email from project ID
router.route('/email-from-project/:projectId').get(getUserEmailFromProjectId);

// Route to get projects by userEmail
router.route('/projects/:userEmail').get(getProjectsByUserEmail);

// Route to list projects of a user by email
router.route('/projects-list/:email').get(listProjectsByUserEmail);

module.exports = router;
