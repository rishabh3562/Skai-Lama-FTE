const router = require('express').Router();

const {
  createTranscript,
  getTranscriptsByProjectId,
  deleteTranscript,
  updateTranscript,
  replaceTranscript,
} = require('../controllers/transcriptController');

// Route to create a new transcript entry
router.route('/').post( createTranscript);

// Route to get all transcripts for a specific project
router.route('/:projectId').get( getTranscriptsByProjectId);

// Route to delete a transcript by its ID
router.route('/:transcriptId').delete( deleteTranscript);

// Route to update a transcript partially
router.route('/:transcriptId').patch( updateTranscript);

// Route to replace a transcript entirely
router.route('/:transcriptId').put( replaceTranscript);
module.exports = router;
