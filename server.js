const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve blog posts
app.get('/blog', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json'); // Corrected filename
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading posts.json:", err);
            return res.status(500).json({ error: 'Error loading blog posts' });
        }
        try {
            const posts = JSON.parse(data); // Parse JSON data
            res.json(posts);
        } catch (parseError) {
            console.error("Error parsing posts.json:", parseError);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
