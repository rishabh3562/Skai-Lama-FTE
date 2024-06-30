const Transcript = require('../models/Transcript');
const Project = require('../models/Project'); // Assuming you have a Project model

// Controller to create a new transcript entry
exports.createTranscript = async (req, res) => {
  const { projectId, description,name } = req.body;

  try {
    // Check if projectId exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create new transcript entry
    const newTranscript = new Transcript({
      projectId,
      description,
      name
    });

    const savedTranscript = await newTranscript.save();
    res.status(201).json(savedTranscript);
  } catch (error) {
    console.error('Error creating transcript:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to get all transcripts for a specific project
exports.getTranscriptsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const transcripts = await Transcript.find({ projectId }).sort({ timestamp: -1 });
    res.status(200).json(transcripts);
  } catch (error) {
    console.error('Error fetching transcripts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to delete a transcript by its ID
exports.deleteTranscript = async (req, res) => {
  const { transcriptId } = req.params;

  try {
    const deletedTranscript = await Transcript.findByIdAndDelete(transcriptId);
    if (!deletedTranscript) {
      return res.status(404).json({ error: 'Transcript not found' });
    }
    res.status(200).json({ message: 'Transcript deleted successfully' });
  } catch (error) {
    console.error('Error deleting transcript:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to update a transcript partially
exports.updateTranscript = async (req, res) => {
  const { transcriptId } = req.params;
  const { description } = req.body;

  try {
    const updatedTranscript = await Transcript.findByIdAndUpdate(
      transcriptId,
      { $set: { description } },
      { new: true }
    );

    if (!updatedTranscript) {
      return res.status(404).json({ error: 'Transcript not found' });
    }

    res.status(200).json(updatedTranscript);
  } catch (error) {
    console.error('Error updating transcript:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to replace a transcript entirely
exports.replaceTranscript = async (req, res) => {
  const { transcriptId } = req.params;
  const { projectId, description } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const replacedTranscript = await Transcript.findByIdAndUpdate(
      transcriptId,
      { projectId, description },
      { new: true }
    );

    if (!replacedTranscript) {
      return res.status(404).json({ error: 'Transcript not found' });
    }

    res.status(200).json(replacedTranscript);
  } catch (error) {
    console.error('Error replacing transcript:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
