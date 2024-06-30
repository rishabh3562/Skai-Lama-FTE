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
    await user.save();
    res.status(201).json({ message: 'Email saved', sessionId });
  } else {
    user.activities.push({ sessionId, metadata, timestamp: new Date() });
    await user.save();
    res.status(200).json({ message: 'Activity logged', sessionId, userId: user._id });
  }
});

// Controller to update user profile picture URL
exports.updateUserProfilePic = catchAsyncErrors(async (req, res) => {
  const { userId } = req.params;
  const { profilePicUrl } = req.body;

  try {
    const user = await User.findById(userId);
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

// Other controller methods as per your existing routes and requirements
