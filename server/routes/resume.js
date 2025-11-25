const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Create or Update Resume
router.post('/', async (req, res) => {
    try {
        const resumeData = req.body;
        // For simplicity, we'll just create a new one every time or update if ID is provided
        // In a real app, we'd handle user authentication
        if (resumeData._id) {
            const updatedResume = await Resume.findByIdAndUpdate(resumeData._id, resumeData, { new: true });
            return res.json(updatedResume);
        }
        const newResume = new Resume(resumeData);
        const savedResume = await newResume.save();
        res.json(savedResume);
    } catch (error) {
        console.error("Save Resume Error:", error);
        res.status(500).json({ error: "Failed to save resume" });
    }
});

// Get Resume by ID
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ error: "Resume not found" });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch resume" });
    }
});

module.exports = router;
