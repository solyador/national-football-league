const ChampionsModel = require('./champions.model.js');

module.exports = {
    findAll: async () => {
        try {
            return await ChampionsModel.find()
        } catch (err) {
            return []
        }
    },
    create: async (champion) => {
        try {
            const championCreated = new ChampionsModel(champion)
            const response = await championCreated.save()
            return response
        } catch (err) {
            return {}
        }
    }
}