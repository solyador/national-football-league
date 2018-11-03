process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../../app.js')
require('../../config/dbConfig.js')
const SeasonsModel = require('./seasons.model.js');
const seasons = [
    new SeasonsModel({ week: 1 }),
    new SeasonsModel({ week: 2 })
]
beforeEach(async () => {
    jest.setTimeout(10000);
    await SeasonsModel.insertMany(seasons)
})

afterEach(async () => {
    await SeasonsModel.remove({})
})

describe('test seasons controller', () => {
    test('It should return all seasons', async () => {
        const response = await request(app).get('/seasons')
        const res = JSON.stringify(response.body)
        const champs = JSON.stringify(seasons)
        expect(res).toEqual(champs)
        expect(response.statusCode).toBe(200)
    })
})