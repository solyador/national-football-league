const TeamsModel = require('./teams.model.js')

findAll = async () => {
    return await TeamsModel.find()
},

findOne = async (id) => {
    return await TeamsModel.findOne({ _id: id })
},

deleteOne = async (id) => {
    return await TeamsModel.deleteOne({ _id: id })
},

update = async (id, data) => {
    const query = { _id: id }
    const options = { new: true }
    return await TeamsModel.findOneAndUpdate(query, data, options)
},

create = async (team) => {
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