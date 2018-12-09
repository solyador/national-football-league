const TeamsModel = require('../../components/teams/teams.model.js')

initTeams = async () => {
    let teams = []
    let team = null
    const teamList = require('./teams.json')
    teamList.forEach(element => {
        team = new TeamsModel(element)
        teams.push(team)
    })
    await TeamsModel.insertMany(teams)
}

module.exports = {
    initTeams
}