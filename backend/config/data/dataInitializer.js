const TeamsModel = require('../../components/teams/teams.model.js')
const RankingsModel = require('../../components/rankings/rankings.model.js')
const StandingsModel = require('../../components/standings/standings.model.js')

const initTeams = async () => {
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
}

const initRankings = async () => {
    let rankings = await RankingsModel.find()
    if (rankings && rankings.length === 32) {
        return
    }
    let ranking = null
    for(let i=0;i<32;i++) {
        ranking = new RankingsModel({
            ranking: i+1,
            season: 1,
            team: i+1
        })
        rankings.push(ranking)
    }
    await RankingsModel.insertMany(rankings)
}

const initStandings = async () => {
    let standings = await StandingsModel.find()
    if (standings && standings.length === 32) {
        return
    }
    let standing = null
    for(let i=0;i<32;i++) {
        standing = new StandingsModel({
            team: i+1,
            win: 0,
            lost: 0,
            draw: 0,
            scored: 0,
            conceded: 0
        })
        standings.push(standing)
    }
    await StandingsModel.insertMany(standings)
}

module.exports = {
    initTeams,
    initRankings,
    initStandings
}