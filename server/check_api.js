require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Querying: ${url.replace(apiKey, 'HIDDEN_KEY')}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.models) {
                console.log("Available Models:");
                parsedData.models.forEach(model => {
                    console.log(`- ${model.name} (${model.supportedGenerationMethods.join(', ')})`);
                });
            } else {
                console.log("Response:", JSON.stringify(parsedData, null, 2));
            }
        } catch (e) {
            console.log("Raw Response:", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
