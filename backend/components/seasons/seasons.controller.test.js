process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../../app.js')
const mongoose = require('mongoose')
require('../../config/dbConfig.js')

const SeasonsModel = require('./seasons.model.js')
const seasons = [
    new SeasonsModel({ seasonId: 1, weekToPlay: 1 }),
    new SeasonsModel({ seasonId: 2, weekToPlay: 2 })
]

beforeEach(async () => {
    jest.setTimeout(10000)
    await SeasonsModel.insertMany(seasons)
})

afterEach(async () => {
    await SeasonsModel.remove({})
})

describe('test seasons controller', () => {

    test('It should return all seasons', async () => {
        const response = await request(app).get('/seasons')
        const res = JSON.stringify(response.body)
        const seasonList = JSON.stringify(seasons)

        expect(res).toEqual(seasonList)
        expect(response.statusCode).toBe(200)
    })

    test('It should return a season', async () => {
        const season = new SeasonsModel({ seasonId: 6, weekToPlay: 15 })
        await season.save()
        const response = await request(app).get('/seasons/' + season._id)

        expect(response.statusCode).toEqual(200)
        expect(response.body.weekToPlay).toBe(15)
    })

    it('It should delete season', async () => {
        const seasonToDelete = new SeasonsModel({ seasonId: 4, weekToPlay: 1 })
        await seasonToDelete.save()

        const response = await request(app).delete('/seasons/' + seasonToDelete._id)
        const season = await SeasonsModel.findById(seasonToDelete._id)

        expect(season).toBeNull()
        expect(response.status).toBe(200)
    })

    it('It should update season', async () => {
        const seasonToUpdate = new SeasonsModel({ seasonId: 4, weekToPlay: 1 })
        await seasonToUpdate.save()
        const data = { weekToPlay: 12 }

        const response = await request(app).put('/seasons/' + seasonToUpdate._id).send(data)
        const season = await SeasonsModel.findById(seasonToUpdate._id)

        expect(response.status).toBe(200)
        expect(season.weekToPlay).toBe(12)
    })

    it('It should create season', async () => {
        const seasonToCreate = new SeasonsModel({ seasonId: 5, weekToPlay: 1, champion: 23 })

        const response = await request(app).post('/seasons').send(seasonToCreate)

        expect(response.status).toBe(200)
        expect(response.body.weekToPlay).toBe(1)
        expect(response.body.champion).toBe(23)
    })
})
