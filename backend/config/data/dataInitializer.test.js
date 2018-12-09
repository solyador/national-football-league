process.env.NODE_ENV = 'test'

require('../../config/db/dbConfig.js')
const TeamsModel = require('../../components/teams/teams.model.js')
const RankingsModel = require('../../components/rankings/rankings.model.js')
const dataInitializer = require('./dataInitializer.js')

beforeEach(async () => {
    jest.setTimeout(10000)
})

afterEach(async () => {
    await TeamsModel.remove({})
    await RankingsModel.remove({})
})

describe('should init data when calling the init method', () => {

    test('should init teams on startup if first time', async () => {
        await dataInitializer.initTeams()
        const teams = await TeamsModel.find() 
        expect(teams.length).toBe(32)
    })

    test('should init rankings on startup if first time', async () => {
        await dataInitializer.initRankings()
        const rankings = await RankingsModel.find() 
        expect(rankings.length).toBe(32)
        expect(rankings[0].team).toBe(rankings[0].ranking)
        expect(rankings[1].team).toBe(rankings[1].ranking)
    })
})