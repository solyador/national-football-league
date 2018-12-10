const standingsService = require('./standings.service.js')

const findAll = async (req, res) => {
    const standings = await standingsService.findAll()
    if (!standings) {
        return res.status(404).send({
            message: "Standings not found."
        })
    }
    res.send(standings)
}

const findOne = async (req, res) => {
    const id = req.params.id
    const standing = await standingsService.findOne(id)
    if (!standing) {
        return res.status(404).send({
            message: "Standing not found."
        })
    }
    res.send(standing)

}

const create = async (req, res) => {
    const standing = req.body
    const createdStanding = await standingsService.create(standing)
    if (!createdStanding) {
        return res.status(403).send({
            message: 'bad request'
        })
    }
    res.send(createdStanding)
}

const update = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const standingUpdated = await standingsService.update(id, data)
    if (!standingUpdated) {
        return res.status(404).send({
            message: 'Standing not found'
        })
    }
    res.send(standingUpdated)
}

const deleteOne = async (req, res) => {
    const id = req.params.id
    const response = await standingsService.deleteOne(id)
    if (response.n === 0) {
        return res.status(404).send({
            message: 'Standing not found'
        })     
    }
    if (response.n === 1) {
        return res.status(200).send({
            message: "Standing successfully deleted."
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