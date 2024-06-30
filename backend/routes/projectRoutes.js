const express = require('express');
const router = express.Router();
const { createProject, getProjectById, getSlugByProjectId } = require('../controllers/projectController');

// Route to create a new project
router.route('/').post(createProject);

// Route to get project by projectId
router.route('/:projectId').get(getProjectById);

router.route('/:projectId/slug').get(getSlugByProjectId)
module.exports = router;
