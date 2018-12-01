const mongoose = require('mongoose');

const SeasonSchema = mongoose.Schema({
    week: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('Season', SeasonSchema);