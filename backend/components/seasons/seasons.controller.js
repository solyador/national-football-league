const seasonsService = require('./seasons.service.js')

module.exports = {
    findAll: async (req, res) => {
        const seasons = await seasonsService.findAll()
        if (!seasons) {
            return res.status(404).send({
                message: "Seasons not found."
            })
        }
        res.send(seasons)
    },

    findOne: async (req, res) => {
        const id = req.params.id
        const season = await seasonsService.findOne(id)
        if (!season) {
            return res.status(404).send({
                message: "Season not found."
            })
        }
        res.send(season)

    },

    create: async (req, res) => {
        const season = req.body
        const createdSeason = await seasonsService.create(season)
        if (!createdSeason) {
            return res.status(403).send({
                message: 'bad request'
            })
        }
        res.send(createdSeason)
    },

    update: async (req, res) => {
        const seasonId = req.params.id
        const data = req.body
        const seasonUpdated = await seasonsService.update(seasonId, data)
        if (!seasonUpdated) {
            return res.status(404).send({
                message: 'Season not found'
            })
        }
        res.send(seasonUpdated)
    },

    delete: async (req, res) => {
        const seasonId = req.params.id
        const response = await seasonsService.delete(seasonId)
        if (response.n === 0) {
            return res.status(404).send({
                message: 'Season not found'
            })
        }
        if (response.n === 1) {
            return res.status(200).send({
                message: "Season successfully deleted."
            })
        }
    }
}