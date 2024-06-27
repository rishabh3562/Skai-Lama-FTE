const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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
    res.status(200).json({ message: 'Activity logged', sessionId });
  }
});

exports.test = catchAsyncErrors(async (req, res) => {
  res.status(200).json({ message: 'Test endpoint reached successfully' });
});
