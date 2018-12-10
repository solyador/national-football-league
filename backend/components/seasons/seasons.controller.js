const seasonsService = require('./seasons.service.js')

const findAll = async (req, res) => {
    const seasons = await seasonsService.findAll()
    if (!seasons) {
        return res.status(404).send({
            message: "Seasons not found."
        })
    }
    res.send(seasons)
}

const findOne = async (req, res) => {
    const id = req.params.id
    const season = await seasonsService.findOne(id)
    if (!season) {
        return res.status(404).send({
            message: "Season not found."
        })
    }
    res.send(season)

}

const create = async (req, res) => {
    const season = req.body
    const createdSeason = await seasonsService.create(season)
    if (!createdSeason) {
        return res.status(403).send({
            message: 'bad request'
        })
    }
    res.send(createdSeason)
}

const update = async (req, res) => {
    const seasonId = req.params.id
    const data = req.body
    const seasonUpdated = await seasonsService.update(seasonId, data)
    if (!seasonUpdated) {
        return res.status(404).send({
            message: 'Season not found'
        })
    }
    res.send(seasonUpdated)
}

const deleteOne =  async (req, res) => {
    const seasonId = req.params.id
    const response = await seasonsService.deleteOne(seasonId)
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

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  