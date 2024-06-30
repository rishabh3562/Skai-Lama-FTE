const User = require('../models/User');
const Project = require('../models/Project');
const { v4: uuidv4 } = require('uuid');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Controller to save user email and log activities
exports.emailController = catchAsyncErrors(async (req, res) => {
  const { email, metadata } = req.body;
  let user = await User.findOne({ email });
  const sessionId = uuidv4();

  if (!user) {
    user = new User({ email, activities: [{ sessionId, metadata, timestamp: new Date() }] });
    const saved=await user.save();
    res.status(201).json({ message: 'Email saved', sessionId });
  } else {
    user.activities.push({ sessionId, metadata, timestamp: new Date() });
    await user.save();
    res.status(200).json({ message: 'Activity logged', sessionId,userId: user._id });
  }
});

// Controller to get user email from project ID
exports.getUserEmailFromProjectId = catchAsyncErrors(async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const userEmail = project.userEmail;
    res.status(200).json({ userEmail });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller to get projects by userEmail
exports.getProjectsByUserEmail = catchAsyncErrors(async (req, res) => {
  const { userEmail } = req.params;

  try {
    const projects = await Project.find({ userEmail });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Controller to list projects of a user by email
exports.listProjectsByUserEmail = catchAsyncErrors(async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const projects = await Project.find({ userEmail: email });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

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
exports.updateUserProfilePic = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  const { profilePicUrl } = req.body;

  try {
    const user = await User.find({ email: userId });//using email as unique identifier
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePic = profilePicUrl;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated successfully', profilePicUrl });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
