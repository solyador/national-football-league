const TeamsModel = require('../../components/teams/teams.model.js')
const RankingsModel = require('../../components/rankings/rankings.model.js')

initTeams = async () => {
    const teams = await TeamsModel.find()
    if (teams && teams.length === 32) {
        return
    }
    let team = null
    const teamList = require('./teams.json')
    teamList.forEach(element => {
        team = new TeamsModel(element)
        teams.push(team)
    })
    await TeamsModel.insertMany(teams)
},

initRankings = async () => {
    let rankings = await RankingsModel.find()
    if (rankings && rankings.length === 32) {
        return
    }
    let ranking = null
    for(var i=0;i<32;i++) {
        ranking = new RankingsModel({
            ranking: i+1,
            season: 1,
            team: i+1
        })
        rankings.push(ranking)
    }
    await RankingsModel.insertMany(rankings)
}

module.exports = {
    initTeams,
    initRankings
}