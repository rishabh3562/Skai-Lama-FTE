const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['done', 'in-progress', 'active', 'deleted'],
    default: 'in-progress',
  },
});

module.exports = mongoose.model('Project', projectSchema);
