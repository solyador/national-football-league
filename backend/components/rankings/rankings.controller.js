const rankingsService = require('./rankings.service.js')

module.exports = {
    findAll: async (req, res) => {
        const rankings = await rankingsService.findAll()
        if (!rankings) {
            return res.status(404).send({
                message: "Rankings not found."
            })
        }
        res.send(rankings)
    },

    findOne: async (req, res) => {
        const rankingId = req.params.id
        const ranking = await rankingsService.findOne(rankingId)
        if (!ranking) {
            return res.status(404).send({
                message: "Ranking not found."
            })
        }
        res.send(ranking)

    },

    create: async (req, res) => {
        const ranking = req.body
        const createdRanking = await rankingsService.create(ranking)
        if (!createdRanking) {
            return res.status(403).send({
                message: 'bad request'
            })
        }
        res.send(createdRanking)
    },

    update: async (req, res) => {
        const rankingId = req.params.id
        const data = req.body
        const rankingUpdated = await rankingsService.update(rankingId, data)
        if (!rankingUpdated) {
            return res.status(404).send({
                message: 'Ranking not found'
            })
        }
        res.send(rankingUpdated)
    },

    delete: async (req, res) => {
        const rankingId = req.params.id
        const response = await rankingsService.delete(rankingId)
        if (response.n === 0) {
            return res.status(404).send({
                message: 'Ranking not found'
            })
        }
        if (response.n === 1) {
            return res.status(200).send({
                message: "Ranking successfully deleted."
            })
        }
    }
}