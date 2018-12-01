//const HTTPStatus = require('http-status');
const championsService = require('./champions.service.js')

module.exports = {
    findAll: async (req, res) => {
        try {
            const champions = await championsService.findAll()
            res.send(champions)
        } catch (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
                message: err.message || "Some error occurred while retrieving champions."
            })
        }
    },

    create: async (req, res) => {
        try {
            const champion = req.body
            const response = await championsService.create(champion)
            res.send(response)
        } catch (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
                message: err.message || "Some error occurred while searching for the champion."
            })
        }
    },

    findOne: async (req, res) => {
        try {
            const season = req.params.season
            const response = await championsService.findOne(season)
            console.log(response)
            res.send(response)
        } catch (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
                message: err.message || "Some error occurred while creating the champion."
            })
        }
    },
}