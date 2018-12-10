const StandingsModel = require('./standings.model.js')

const findAll = async () => {
    return await StandingsModel.find()
}

const findOne = async (id) => {
    return await StandingsModel.findOne({ _id: id })
}

const deleteOne = async (id) => {
    return await StandingsModel.deleteOne({ _id: id })
}

const update = async (id, data) => {
    const query = { _id: id }
    const options = { new: true }
    return await StandingsModel.findOneAndUpdate(query, data, options)
}

const create = async (standing) => {
    try {
        return await StandingsModel.create(standing)
    } catch (error) {
        console.log('bad request to create standing: ', standing, ' error ', error)   
    }    
}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  