const rankingsService = require('./rankings.service.js')


const findAll = async (req, res) => {
    const rankings = await rankingsService.findAll()
    if (!rankings) {
        return res.status(404).send({
            message: "Rankings not found."
        })
    }
    res.send(rankings)
}

const findOne = async (req, res) => {
    const rankingId = req.params.id
    const ranking = await rankingsService.findOne(rankingId)
    if (!ranking) {
        return res.status(404).send({
            message: "Ranking not found."
        })
    }
    res.send(ranking)

}

const create = async (req, res) => {
    const ranking = req.body
    const createdRanking = await rankingsService.create(ranking)
    if (!createdRanking) {
        return res.status(403).send({
            message: 'bad request'
        })
    }
    res.send(createdRanking)
}

const update = async (req, res) => {
    const rankingId = req.params.id
    const data = req.body
    const rankingUpdated = await rankingsService.update(rankingId, data)
    if (!rankingUpdated) {
        return res.status(404).send({
            message: 'Ranking not found'
        })
    }
    res.send(rankingUpdated)
}

const deleteOne = async (req, res) => {
    const rankingId = req.params.id
    const response = await rankingsService.deleteOne(rankingId)
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

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}    