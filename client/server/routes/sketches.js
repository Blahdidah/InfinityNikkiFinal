const express = require('express');
const router = express.Router();
const Sketch = require('../models/Sketches');

router.get('/', async (req, res) => {
    try {
        const sketches = await Sketch.find();
        res.json(sketches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST endpoint to create a new sketch
router.post('/', async (req, res) => {
    try {
        const newSketch = new Sketch(req.body);
        await newSketch.save();
        res.status(201).json(newSketch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
