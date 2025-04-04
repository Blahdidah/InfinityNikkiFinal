const mongoose = require("mongoose");
const fs = require("fs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/NikkiSketchDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Load JSON file
const materials = JSON.parse(fs.readFileSync("InfinityNikki_materials.json", "utf-8"));
const sketches = JSON.parse(fs.readFileSync("IN_Sketches.json", "utf-8"));

// Define Schema and Model
const MaterialSchema = new mongoose.Schema({
    name: String,
    type: String,
    source: [String], 
    rarity: Number
});
const Material = mongoose.model("Material", MaterialSchema);

// Updated Sketch Schema based on your interface
const SketchSchema = new mongoose.Schema({
    name: String,
    description: String,
    styles: {
        type: [String],
        enum: ['Elegant', 'Fresh', 'Sweet', 'Sexy', 'Cool']
    },
    attributes: [String],
    category: {
        type: String,
        enum: ['Clothing', 'Accessories', 'Makeup']
    },
    type: String,
    materials: [{
        material: String,
        quantity: Number
    }],
    image_url: String,
    obtained: String,
    stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    part_of_set: Boolean,
    set_name: String
});
const Sketch = mongoose.model("Sketch", SketchSchema);

// Insert Data
async function insertData() {
    try {
        const materialCount = await Material.countDocuments();
        const sketchCount = await Sketch.countDocuments();

        if (materialCount === 0) {
            await Material.insertMany(materials);
            console.log("Materials imported successfully!");
        } else {
            console.log("Materials already exist. Skipping import.");
        }

        if (sketchCount === 0) {
            await Sketch.insertMany(sketches);
            console.log("Sketches imported successfully!");
        } else {
            console.log("Sketches already exist. Skipping import.");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

insertData();