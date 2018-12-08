const StandingsModel = require('./standings.model.js')

module.exports = {
    findAll: async () => {
        return await StandingsModel.find()
    },

    findOne: async (id) => {
        return await StandingsModel.findOne({ _id: id })
    },

    delete: async (id) => {
        return await StandingsModel.deleteOne({ _id: id })
    },

    update: async (id, data) => {
        const query = { _id: id }
        const options = { new: true }
        return await StandingsModel.findOneAndUpdate(query, data, options)
    },

    create: async (standing) => {
        try {
            return await StandingsModel.create(standing)
        } catch (error) {
            console.log('bad request to create standing: ', standing, ' error ', error)   
        }
        
    }
}