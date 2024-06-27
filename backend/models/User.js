const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activities: [
    {
      sessionId: {
        type: String,
        required: true
      },
      metadata: {
        type: mongoose.Schema.Types.Mixed
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;