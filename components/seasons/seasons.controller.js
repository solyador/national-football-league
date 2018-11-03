const seasonsService = require('./seasons.service.js')

module.exports = {
    findAll: async (req, res) => {
        try {
            const seasons = await seasonsService.findAll()
            res.send(seasons)
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving seasons."
            })
        }
    }
}