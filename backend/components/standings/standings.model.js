const mongoose = require('mongoose')

const StandingSchema = mongoose.Schema({
    team: {
        type: Number,
        unique: true,
        required: true
    },
    win: {
        type: Number
    },
    lost: {
        type: Number
    },
    draw: {
        type: Number
    },
    scored: {
        type: Number
    },
    conceded: {
        type: Number
    },

}, {
        timestamps: true
    })

module.exports = mongoose.model('Standing', StandingSchema)