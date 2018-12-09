process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../../app.js')
require('../../config/db/dbConfig.js')

const RankingsModel = require('./rankings.model.js')
const rankings = [
    new RankingsModel({ ranking: 1, season: 1, team: 1 }),
    new RankingsModel({ ranking: 2, season: 1, team: 2 })
]

beforeEach(async () => {
    jest.setTimeout(10000)
    await RankingsModel.insertMany(rankings)
})

afterEach(async () => {
    await RankingsModel.remove({})
})

describe('test rankings controller', () => {

    test('It should return all rankings', async () => {
        const response = await request(app).get('/rankings/')
        const res = JSON.stringify(response.body)
        const rankingList = JSON.stringify(rankings)
        expect(res).toEqual(rankingList)
        expect(response.statusCode).toBe(200)
    })

    test('It should return a ranking', async () => {
        const ranking = new RankingsModel({ ranking: 23, season: 2, team: 14 })
        ranking.save()

        const response = await request(app).get('/rankings/' + ranking._id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.team).toBe(14)
    })

    test('It should delete ranking', async () => {
        const rankingToDelete = new RankingsModel({ ranking: 31, season: 4, team: 30 })
        await rankingToDelete.save()

        const response = await request(app).delete('/rankings/' + rankingToDelete._id)
        const ranking = await RankingsModel.findById(rankingToDelete._id)

        expect(ranking).toBeNull()
        expect(response.status).toBe(200)
    })

    test('It should update ranking', async () => {
        const rankingToUpdate = new RankingsModel({ ranking: 9, season: 1, team: 3 })
        await rankingToUpdate.save()
        const data = { team: 5 }

        const response = await request(app).put('/rankings/' + rankingToUpdate._id).send(data)

        expect(response.status).toBe(200)
        expect(response.body.team).toBe(5)
    })

    test('It should create ranking', async () => {
        const rankingToCreate = new RankingsModel({ ranking: 5, season: 1, team: 23 })

        const response = await request(app).post('/rankings/').send(rankingToCreate)

        expect(response.status).toBe(200)
        expect(response.body.team).toBe(23)
    })
})
