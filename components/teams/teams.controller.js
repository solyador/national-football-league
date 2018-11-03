const teamsService = require('./teams.service.js')

module.exports = {
    findAll: async (req, res) => {
        try {
            const teams = await teamsService.findAll()
            res.send(teams)
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving teams."
            })
        }
    }
}