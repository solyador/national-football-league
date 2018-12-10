const RankingsModel = require('./rankings.model.js')

const findAll = async () => {
    return await RankingsModel.find()
}

const findOne = async (rankingId) => {
    return await RankingsModel.findById(rankingId)
}

const deleteOne = async (rankingId) => {
    return await RankingsModel.deleteOne({ _id: rankingId })
}

const update = async (rankingId, data) => {
    const query = { _id: rankingId }
    const options = { new: true }
    return await RankingsModel.findOneAndUpdate(query, data, options)
}

const create = async (ranking) => {
    try {
        return await RankingsModel.create(ranking)
    } catch (error) {
        console.log('bad request to create ranking: ', ranking, ' error ', error)
    }
}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  