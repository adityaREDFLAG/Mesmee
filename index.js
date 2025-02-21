const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/meme", async (req, res) => {
    try {
        console.log("Fetching meme from API...");
        const response = await axios.get("https://meme-api.com/gimme/");

        if (!response.data || !response.data.url) {
            console.error("Invalid response from API:", response.data);
            return res.status(500).json({ error: "Invalid response from meme API." });
        }

        const meme = response.data;
        console.log("Meme received:", meme);

        res.json({
            title: meme.title,
            author: meme.author,
            image_url: meme.url
        });
    } catch (error) {
        console.error("Error fetching meme:", error.message);
        res.status(500).json({ error: "Failed to fetch meme." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Required for Vercel
