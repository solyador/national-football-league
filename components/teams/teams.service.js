const TeamsModel = require('./teams.model.js');

module.exports = {
    findAll: async () => {
        try {
            return await TeamsModel.find()
        } catch (error) {
            return []
        }
    }
}