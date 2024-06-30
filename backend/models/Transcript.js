const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name:{
    type: String,

  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['done', 'in-progress', 'failed'],
    default: 'done',
  },
  previousDescriptions: [
    {
      description: String,
      timestamp: Date
    }
  ]
});

module.exports = mongoose.model('Transcript', transcriptSchema);
