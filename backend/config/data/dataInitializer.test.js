process.env.NODE_ENV = 'test'

require('../../config/db/dbConfig.js')
const TeamsModel = require('../../components/teams/teams.model.js')
const dataInitializer = require('./dataInitializer.js')

beforeEach(async () => {
    jest.setTimeout(10000)
    await TeamsModel.remove({})
})

afterEach(async () => {
    await TeamsModel.remove({})
})

describe('should init data when calling the init method', () => {
    test('should init teams on startup if first time', async () => {
        await dataInitializer.initTeams()
        const teams = await TeamsModel.find() 
        expect(teams.length).toBe(32)
    })
})