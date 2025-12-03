require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // There isn't a direct listModels method on the instance in the Node SDK easily accessible 
        // without using the model manager, but usually we just try a known working model.
        // However, let's try to just run a simple prompt with 'gemini-1.5-flash' again 
        // and print the EXACT error to console.

        console.log("Testing gemini-1.5-flash-001...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await model.generateContent("Hello");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash-001:", error.message);
    }

    try {
        console.log("\nTesting gemini-1.0-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.0-pro:", error.message);
    }
}

listModels();
