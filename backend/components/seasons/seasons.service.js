const SeasonsModel = require('./seasons.model.js');

module.exports = {
    findAll: async () => {
        try {
            return await SeasonsModel.find()
        } catch (error) {
            return []
        }
    }
}