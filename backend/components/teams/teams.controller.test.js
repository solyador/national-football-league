process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../../app.js')
require('../../config/dbConfig.js')
const TeamsModel = require('./teams.model.js');
const teams = [
    new TeamsModel({
        teamId: 1, name: 'PATRIOTS', city: 'NEW ENGLAND',
        stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
    }),
    new TeamsModel({
        teamId: 2, name: 'BALTIMORE', city: 'RAVENS',
        stadium: 'Stadium', conference: 'AFC', division: 'NORTH'
    })
]
beforeEach(async () => {
    jest.setTimeout(10000);
    await TeamsModel.insertMany(teams)
})

afterEach(async () => {
    await TeamsModel.remove({})
})

describe('test teams controller', () => {
    test('It should return all teams', async () => {
        const response = await request(app).get('/teams')
        const res = JSON.stringify(response.body)
        const champs = JSON.stringify(teams)
        expect(res).toEqual(champs)
        expect(response.statusCode).toBe(200)
    })
})