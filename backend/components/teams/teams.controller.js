const teamsService = require('./teams.service.js')

const findAll = async (req, res) => {
    const teams = await teamsService.findAll()
    if (!teams) {
        return res.status(404).send({
            message: "Teams not found."
        })
    }
    res.send(teams)
}

const findOne = async (req, res) => {
    const id = req.params.id
    const team = await teamsService.findOne(id)
    if (!team) {
        return res.status(404).send({
            message: "Team not found."
        })
    }
    res.send(team)

}

const create = async (req, res) => {
    const team = req.body
    const createdTeam = await teamsService.create(team)
    if (!createdTeam) {
        return res.status(403).send({
            message: 'bad request'
        })
    }
    res.send(createdTeam)
}

const update = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const teamUpdated = await teamsService.update(id, data)
    if (!teamUpdated) {
        return res.status(404).send({
            message: 'Team not found'
        })
    }
    res.send(teamUpdated)
}

const deleteOne = async (req, res) => {
    const id = req.params.id
    const response = await teamsService.deleteOne(id)
    if (response.n === 0) {
        return res.status(404).send({
            message: 'Team not found'
        })     
    }
    if (response.n === 1) {
        return res.status(200).send({
            message: "Team successfully deleted."
        })
    }
}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  