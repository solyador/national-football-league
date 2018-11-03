process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../../app.js')
require('../../config/dbConfig.js')
const ChampionsModel = require('./champions.model.js');
const champions = [
    new ChampionsModel({ season: 1, team: 1 }),
    new ChampionsModel({ season: 2, team: 2 })
]
beforeEach(async () => {
    jest.setTimeout(10000);
    await ChampionsModel.insertMany(champions)
})

afterEach(async () => {
    await ChampionsModel.remove({})
})

describe('test champions controller', () => {
    test('It should return all champions', async () => {
        const response = await request(app).get('/champions')
        const res = JSON.stringify(response.body)
        const champs = JSON.stringify(champions)
        expect(res).toEqual(champs)
        expect(response.statusCode).toBe(200)
    })
})