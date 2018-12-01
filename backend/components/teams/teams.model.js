const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    teamId: Number,
    name: String,
    city: String,
    stadium: String,
    conference: {
        type: String,
        enum: ['AFC', 'NFC']
    },
    division: {
        type: String,
        enum: ['NORTH', 'SOUTH', 'EAST', 'WEST']
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Team', TeamSchema);