const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
    name: String,
    type: String,
    sources: [String],
    rarity: Number
});

module.exports = mongoose.model("Material", MaterialSchema);
