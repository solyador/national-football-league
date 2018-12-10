const GamesModel = require('./games.model.js')

const findAll = async () => {
    return await GamesModel.find()
}

const findOne = async (gameId) => {
    return await GamesModel.findById(gameId)
}

const deleteOne = async (gameId) => {
    return await GamesModel.deleteOne({ _id: gameId })
}

const update = async (gameId, data) => {
    const options = { new: true }
    return await GamesModel.findOneAndUpdate({ _id: gameId }, data, options)
}

const create = async (game) => {
    try {
        return await GamesModel.create(game)
    } catch (error) {
        console.log('bad request to create game: ', game, ' error ', error)
    }

}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  