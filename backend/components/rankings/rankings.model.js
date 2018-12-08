const mongoose = require('mongoose')

const RankingSchema = mongoose.Schema({
    ranking: {
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

//RankingSchema.index({ ranking: 1, season: 1 }, { unique: true })
module.exports = mongoose.model('Ranking', RankingSchema)