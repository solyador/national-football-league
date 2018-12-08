const SeasonsModel = require('./seasons.model.js')

module.exports = {
    findAll: async () => {
        return await SeasonsModel.find()
    },

    findOne: async (seasonId) => {
        return await SeasonsModel.findById(seasonId)
    },

    delete: async (seasonId) => {
        return await SeasonsModel.deleteOne({ _id: seasonId })
    },

    update: async (seasonId, data) => {
        const query = { _id: seasonId }
        const options = { new: true }
        return await SeasonsModel.findOneAndUpdate(query, data, options)
    },

    create: async (season) => {
        try {
            return await SeasonsModel.create(season)
        } catch (error) {
            console.log('bad request to create season: ', season, ' error ', error)
        }

    }
}