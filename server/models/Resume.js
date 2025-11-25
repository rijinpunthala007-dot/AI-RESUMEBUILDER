const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
  },
  experience: [{
    jobTitle: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
  }],
  education: [{
    degree: { type: String },
    institution: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  }],
  skills: [{ type: String }],
  profilePictureUrl: { type: String },
  summary: { type: String }, // For the AI generated summary
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
