const mongoose = require('mongoose');

const ChampionSchema = mongoose.Schema({
    team: Number,
    season: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('Champion', ChampionSchema);