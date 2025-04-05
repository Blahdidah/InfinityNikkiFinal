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

// Update a sketch by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Get the sketch ID from the URL parameter
    const updatedSketch = req.body;  // Get the updated sketch data from the request body

    try {
        const sketch = await Sketch.findByIdAndUpdate(id, updatedSketch, { new: true });  // Update and return the updated sketch
        if (!sketch) {
            return res.status(404).json({ message: 'Sketch not found' });
        }
        res.json(sketch);  // Send back the updated sketch
    } catch (err) {
        res.status(500).json({ message: 'Failed to update sketch', error: err });
    }
});

router.delete('/:id', (req, res) => {
    const sketchId = req.params.id;

    // Find the sketch by ID and remove it
    Sketch.findByIdAndDelete(sketchId)
        .then(deletedSketch => {
            if (!deletedSketch) {
                return res.status(404).json({ message: "Sketch not found" });
            }
            res.status(200).json({ message: "Sketch deleted successfully", deletedSketch });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Failed to delete sketch" });
        });
});


module.exports = router;
