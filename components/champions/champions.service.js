const ChampionsModel = require('./champions.model.js');

module.exports = {
    findAll: async () => {
        try {
            return await ChampionsModel.find()
        } catch (error) {
            return []
        }
    }
}