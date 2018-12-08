process.env.NODE_ENV = 'test'
const request = require('supertest')
require('../../config/dbConfig.js')
const mongoose = require('mongoose')
const app = require('../../app.js')

const StandingsModel = require('./standings.model.js')
const standings = [
    new StandingsModel({
        team: 1
    }),
    new StandingsModel({
        team: 2
    })
]

beforeEach(async () => {
    jest.setTimeout(10000)
    await StandingsModel.insertMany(standings)
})

afterEach(async () => {
    await StandingsModel.remove({})
})

describe('testing the standings resource crud operations', () => {
    it('It should return all standings', async () => {
        const response = await request(app).get('/standings')
        const res = JSON.stringify(response.body)

        expect(res).toEqual(JSON.stringify(standings))
        expect(response.statusCode).toBe(200)
    })

    it('It should return one standing', async () => {
        const standing = new StandingsModel({
            team: 7
        })
        standing.save()

        const response = await request(app).get('/standings/' + standing._id)

        expect(response.body.team).toBe(7)
    })

    it('It should delete standing', async () => {
        const standingToDelete = new StandingsModel({
           team: 10
        })
        await standingToDelete.save()

        const response = await request(app).delete('/standings/' + standingToDelete._id)
        const standing = await StandingsModel.findById(standingToDelete._id)

        expect(standing).toBeNull()
        expect(response.status).toBe(200)
    })

    it('It should update standing', async () => {
        const standingToUpdate = new StandingsModel({
            team: 12,
            win: 11,
            lost: 3
        })
        await standingToUpdate.save()
        const data = { draw: 2 }

        const response = await request(app).put('/standings/' + standingToUpdate._id).send(data)

        expect(response.status).toBe(200)
        expect(response.body.draw).toBe(2)
    })

    it('It should create standing', async () => {
        const standingToCreate = new StandingsModel({
            team: 11
        })

        const response = await request(app).post('/standings').send(standingToCreate)

        expect(response.status).toBe(200)
        expect(response.body.team).toBe(11)
    })
})

describe('testing the standings resource, the errors', () => {

    it('It should return 404 when standing to get not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).get('/standings/' + id)
        expect(response.status).toBe(404)
    })

    it('It should return 404 when standing to update not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).put('/standings/' + id).send({})
        expect(response.status).toBe(404)
    })

    it('It should return 404 when standing to delete not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).delete('/standings/' + id)
        expect(response.status).toBe(404)
    })
})