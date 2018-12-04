const TeamsModel = require('./teams.model.js');

module.exports = {
    findAll: async () => {
        return await TeamsModel.find()
    },

    findOne: async (teamId) => {
        return await TeamsModel.findOne({ teamId: teamId })
    },

    delete: async (teamId) => {
        return await TeamsModel.deleteOne({ teamId: teamId })
    },

    update: async (teamId, data) => {
        const query = { teamId: teamId }
        const options = { new: true }
        return await TeamsModel.findOneAndUpdate(query, data, options)
    },

    create: async (team) => {
        try {
            return await TeamsModel.create(team)
        } catch (error) {
            console.log('bad request to create team: ', team, ' error ', error)   
        }
        
    }
}