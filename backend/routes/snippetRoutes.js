// server/routes/snippetRoutes.js
const express = require('express');
const Snippet = require('../models/snippet');
const router = express.Router();

// Create a new snippet
router.post('/', async (req, res) => {
    const { title, code, description } = req.body;
    const newSnippet = new Snippet({ title, code, description });

    try {
        await newSnippet.save();
        res.status(201).json(newSnippet);
    } catch (err) {
        res.status(400).json({ error: 'Error creating snippet' });
    }
});
// Get all snippets
router.get('/', async (req, res) => {
    try {
        const snippets = await Snippet.find(); // Fetch all snippets from the database
        res.status(200).json(snippets);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching snippets' });
    }
});


module.exports = router;
