const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/meme", async (req, res) => {
    try {
        console.log("Fetching meme from API...");
        const response = await axios.get("https://meme-api.com/gimme/dankmemes");

        if (!response.data || !response.data.url) {
            return res.status(500).json({ error: "Invalid response from meme API." });
        }

        res.json({
            title: response.data.title,
            author: response.data.author,
            image_url: response.data.url
        });
    } catch (error) {
        console.error("Error fetching meme:", error.message);
        res.status(500).json({ error: "Failed to fetch meme." });
    }
});

// Export for Vercel
module.exports = app;
