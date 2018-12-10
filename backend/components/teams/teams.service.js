const TeamsModel = require('./teams.model.js')

const findAll = async () => {
    return await TeamsModel.find()
}

const findOne = async (id) => {
    return await TeamsModel.findOne({ _id: id })
}

const deleteOne = async (id) => {
    return await TeamsModel.deleteOne({ _id: id })
}

const update = async (id, data) => {
    const query = { _id: id }
    const options = { new: true }
    return await TeamsModel.findOneAndUpdate(query, data, options)
}

const create = async (team) => {
    try {
        return await TeamsModel.create(team)
    } catch (error) {
        console.log('bad request to create team: ', team, ' error ', error)
    }

}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteOne
}  