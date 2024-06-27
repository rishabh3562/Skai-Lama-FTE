const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  previousDescriptions: [
    {
      description: String,
      timestamp: Date
    }
  ]
});

module.exports = mongoose.model('Transcript', transcriptSchema);
