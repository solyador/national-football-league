const gamesService = require('./games.service.js')

module.exports = {
    findAll: async (req, res) => {
        const games = await gamesService.findAll()
        if (!games) {
            return res.status(404).send({
                message: "Games not found."
            })
        }
        res.send(games)
    },

    findOne: async (req, res) => {
        const id = req.params.id
        const game = await gamesService.findOne(id)
        if (!game) {
            res.status(404).send({
                message: "Game not found."
            })
        }
        res.send(game)

    },

    create: async (req, res) => {
        const game = req.body
        const createdGame = await gamesService.create(game)
        if (!createdGame) {
            return res.status(403).send({
                message: 'bad request'
            })
        }
        res.send(createdGame)
    },

    update: async (req, res) => {
        const gameId = req.params.id
        const data = req.body
        const game = await gamesService.update(gameId, data)
        if (!game) {
            return res.status(404).send({
                message: 'Game not found'
            })
        }
        res.send(game)
    },

    delete: async (req, res) => {
        const gameId = req.params.id
        const response = await gamesService.delete(gameId)
        if (response.n === 0) {
            return res.status(404).send({
                message: 'Game not found'
            })
        }
        if (response.n === 1) {
            return res.status(200).send({
                message: "Game successfully deleted."
            })
        }
    }
}