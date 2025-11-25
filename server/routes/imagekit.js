const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

router.get('/auth', function (req, res) {
    try {
        var result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        res.status(500).send({ error: "Failed to get authentication parameters" });
    }
});

module.exports = router;
