const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
    name: String,
    type: String,
    sources: [String],
    rarity: Number,
    image_url: String
});

module.exports = mongoose.model("Material", MaterialSchema);
