const mongoose = require('mongoose');

const SeasonSchema = mongoose.Schema({
    seasonId: {
        type: Number,
        required: true
    },
    weekToPlay: {
        type: Number,
        required: true
    },
    champion: {
        type: Number,
        required: false
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Season', SeasonSchema);