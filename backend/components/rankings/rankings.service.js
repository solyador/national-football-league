const RankingsModel = require('./rankings.model.js')

module.exports = {
    findAll: async (season) => {
        return await RankingsModel.find({ season: season})
    },

    findOne: async (rankingId, season) => {
        return await RankingsModel.findOne({ rankingId: rankingId, season: season })
    },

    delete: async (rankingId) => {
        return await RankingsModel.deleteOne({ rankingId: rankingId })
    },

    update: async (rankingId, season, data) => {
        const query = { rankingId: rankingId, season: season }
        const options = { new: true }
        return await RankingsModel.findOneAndUpdate(query, data, options)
    },

    create: async (ranking) => {
        try {
            return await RankingsModel.create(ranking)
        } catch (error) {
            console.log('bad request to create ranking: ', ranking, ' error ', error)   
        }
        
    }
}