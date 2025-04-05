const mongoose = require('mongoose');
const { Schema } = mongoose;

const sketchSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    styles: { type: [String], enum: ['Elegant', 'Fresh', 'Sweet', 'Sexy', 'Cool'], required: true },
    attributes: { type: [String], required: true },
    category: { type: String, enum: ['Clothing', 'Accessories', 'Makeup'], required: true },
    type: { type: String, required: true },
    materials: [
        {
            material: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    image_url: { type: String, required: true },
    obtained: { type: String, required: true },
    stars: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    part_of_set: { type: Boolean, required: true },
    set_name: { type: String, required: false }
}, { timestamps: true });

const Sketch = mongoose.model('Sketch', sketchSchema);

module.exports = Sketch;
