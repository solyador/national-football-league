const mongoose = require('mongoose')

const RankingSchema = mongoose.Schema({
    rankingId: {
        type: Number,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    team: {
        type: Number
    }
}, {
        timestamps: true
    })

//RankingSchema.index({ rankingId: 1, season: 1 }, { unique: true })
module.exports = mongoose.model('Ranking', RankingSchema)