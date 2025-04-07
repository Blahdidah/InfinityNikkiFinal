const mongoose = require('mongoose');

const craftListSchema = new mongoose.Schema({
    sketches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sketch'
    }]
});

module.exports = mongoose.model('CraftList', craftListSchema);
