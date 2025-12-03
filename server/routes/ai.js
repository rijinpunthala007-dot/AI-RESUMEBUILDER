const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-summary', async (req, res) => {
    try {
        const { experience, skills } = req.body;

        // Construct the prompt
        let prompt = "Act as a professional career coach. Based on the provided raw experience and skills data, generate a concise, three-sentence professional summary for a software developer resume.\n\n";

        if (experience && experience.length > 0) {
            prompt += "Experience:\n";
            experience.forEach(exp => {
                prompt += `- ${exp.jobTitle} at ${exp.company}: ${exp.description}\n`;
            });
        }

        if (skills && skills.length > 0) {
            prompt += "\nSkills: " + skills.join(", ") + "\n";
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ summary: text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate summary" });
    }
});

module.exports = router;
