const GamesModel = require('./games.model.js')

module.exports = {
    findAll: async () => {
        return await GamesModel.find()
    },

    findOne: async (gameId) => {
        return await GamesModel.findById(gameId)
    },

    delete: async (gameId) => {
        return await GamesModel.deleteOne({ _id: gameId })
    },

    update: async (gameId, data) => {
        const options = { new: true }
        return await GamesModel.findOneAndUpdate({ _id: gameId }, data, options)
    },

    create: async (game) => {
        try {
            return await GamesModel.create(game)
        } catch (error) {
            console.log('bad request to create game: ', game, ' error ', error)
        }

    }
}