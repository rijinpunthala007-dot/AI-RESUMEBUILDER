const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// @route   POST /api/resume
// @desc    Create a new resume
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newResume = new Resume(req.body);
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (err) {
        console.error("Create Resume Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/resume/:id
// @desc    Get resume by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });
        res.json(resume);
    } catch (err) {
        console.error("Get Resume Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// @route   PUT /api/resume/:id
// @desc    Update resume
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedResume);
    } catch (err) {
        console.error("Update Resume Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// @route   DELETE /api/resume/:id
// @desc    Delete resume
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        await Resume.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Resume deleted' });
    } catch (err) {
        console.error("Delete Resume Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
