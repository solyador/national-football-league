const SeasonsModel = require('./seasons.model.js')

module.exports = {
    findAll: async () => {
        return await SeasonsModel.find()
    },

    findOne: async (seasonId) => {
        return await SeasonsModel.findOne({ seasonId: seasonId })
    },

    delete: async (seasonId) => {
        return await SeasonsModel.deleteOne({ seasonId: seasonId })
    },

    update: async (seasonId, data) => {
        const query = { seasonId: seasonId }
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