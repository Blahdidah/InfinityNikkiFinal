const express = require('express');
const router = express.Router();
const Sketch = require('../models/Sketches'); // Assuming your Sketch model is in models/sketch.js
const CraftList = require('../models/Craft-List'); // Assuming you have a CraftList model

// Add sketch to the crafting list
router.post('/add-to-craft-list', async (req, res) => {
    console.log('Received body:', req.body);
    const { sketchId } = req.body;

    try {
        // Find the sketch by its ID
        const sketch = await Sketch.findById(sketchId);
        if (!sketch) {
            return res.status(404).json({ message: 'Sketch not found' });
        }

        // Look for an existing craft list
        let craftList = await CraftList.findOne();

        // If no craft list exists, create one
        if (!craftList) {
            craftList = new CraftList({
                sketches: [sketch._id]
            });
            await craftList.save();
            return res.status(200).json({ message: 'Sketch added to new crafting list', craftList });
        }

        // Check if the sketch is already in the crafting list
        const alreadyExists = craftList.sketches.some(
            s => s.toString() === sketchId
        );

        if (alreadyExists) {
            return res.status(200).json({ message: 'Sketch already in crafting list', craftList });
        }

        // Add the sketch if it's not already there
        craftList.sketches.push(sketch._id);
        await craftList.save();

        return res.status(200).json({ message: 'Sketch added to crafting list', craftList });
    } catch (error) {
        console.error('Error adding sketch to craft list:', error);
        return res.status(500).json({ message: 'Failed to add sketch to craft list', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const craftList = await CraftList.findOne().populate('sketches');

        if (!craftList) {
            return res.status(404).json({ message: 'Crafting list not found' });
        }

        return res.status(200).json(craftList);
    } catch (err) {
        console.error('Error fetching craft list:', err);
        return res.status(500).json({ message: 'Failed to fetch crafting list', error: err });
    }
});

module.exports = router;
