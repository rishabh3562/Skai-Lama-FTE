const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    default: '', // Default empty string for profilePic URL
  },
  activities: [
    {
      sessionId: {
        type: String,
        required: true,
      },
      metadata: {
        type: Object,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
