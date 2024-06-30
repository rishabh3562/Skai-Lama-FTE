const Project = require('../models/Project');
const generateSlug = require('../utils/slugify');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Controller to create a new project
exports.createProject = catchAsyncErrors(async (req, res) => {
  const { userEmail, name, description } = req.body;

  try {
    const newProject = new Project({
      userEmail,
      name,
      description,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller to get project by projectId
exports.getProjectById = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller to get slug by projectId
exports.getSlugByProjectId = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const slug = generateSlug(project.name);
    res.status(200).json({ slug });
  } catch (error) {
    console.error('Error fetching slug:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
