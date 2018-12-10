const SeasonsModel = require('./seasons.model.js')

const findAll = async () => {
    return await SeasonsModel.find()
}

const findOne = async (seasonId) => {
    return await SeasonsModel.findById(seasonId)
}

const deleteOne = async (seasonId) => {
    return await SeasonsModel.deleteOne({ _id: seasonId })
}

const update = async (seasonId, data) => {
    const query = { _id: seasonId }
    const options = { new: true }
    return await SeasonsModel.findOneAndUpdate(query, data, options)
}

const create = async (season) => {
    try {
        return await SeasonsModel.create(season)
    } catch (error) {
        console.log('bad request to create season: ', season, ' error ', error)
    }

}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  