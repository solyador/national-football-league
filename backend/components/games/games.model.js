const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    season: {
        type: Number,
        required: true
    },
    week: {
        type: Number
    },
    homeTeam: {
        type: Number,
        required: true
    },
    awayTeam: {
        type: Number,
        required: true
    },
    homeTeamScore: {
        type: Number,
    },
    awayTeamScore: {
        type: Number,
    }
}, {
        timestamps: true
    })

GameSchema.index({ season: 1, week: 1, homeTeam: 1, awayTeam: 1 }, { unique: true })
module.exports = mongoose.model('Game', GameSchema)