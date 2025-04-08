const express = require('express');
const router = express.Router();
const Material = require('../models/Materials');

router.get('/', async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch materials', error: err });
    }
});

// POST new material
router.post('/', async (req, res) => {
    try {
        const newMaterial = new Material(req.body);
        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add material', error: err });
    }
});

// PUT (update) material
router.put('/:id', async (req, res) => {
    try {
        const updated = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Material not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update material', error: err });
    }
});

// DELETE material
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Material.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Material not found' });
        res.json({ message: 'Material deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete material', error: err });
    }
});

module.exports = router;