const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const Material = require('./models/Materials.js'); // Import model
const Sketch = require('./models/Sketches.js');

// Route to fetch all materials
app.get('/api/materials', async (req, res) => {
    try {
        const materials = await Material.find(); // Fetch from DB
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: "Error fetching materials", error: err });
    }
});

app.get('/api/sketches', async (req, res) => {
    try {
        const sketches = await Sketch.find();
        res.json(sketches);
    } catch (err) {
        res.status(500).send('Error fetching sketches: ' + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));