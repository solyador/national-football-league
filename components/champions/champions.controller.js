const championsService = require('./champions.service.js')

module.exports = {
    findAll: async (req, res) => {
        try {
            const champions = await championsService.findAll()
            res.send(champions)
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving champions."
            })
        }
    }
}