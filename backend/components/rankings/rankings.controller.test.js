process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../../app.js')
require('../../config/dbConfig.js')

const RankingsModel = require('./rankings.model.js')
const rankings = [
    new RankingsModel({ rankingId: 1, season: 1, team: 1}),
    new RankingsModel({ rankingId: 2, season: 1, team: 2})
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
        const response = await request(app).get('/rankings/seasons/1')
        const res = JSON.stringify(response.body)
        const rankingList = JSON.stringify(rankings)
        expect(res).toEqual(rankingList)
        expect(response.statusCode).toBe(200)
    })

    test('It should return a ranking', async () => {
        const res = await request(app).get('/rankings/2/seasons/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.team).toBe(2)
    })

    it('It should delete ranking', async () => {
        const rankingToDelete = new RankingsModel({ rankingId: 3, season: 1, team: 3})
        await RankingsModel.create(rankingToDelete)

        const response = await request(app).delete('/rankings/3/seasons/1')
        const ranking = await RankingsModel.findOne({ rankingId: 3, season: 1 })

        expect(ranking).toBeNull()
        expect(response.status).toBe(200)
    })

    it('It should update ranking', async () => {
        const rankingToUpdate = new RankingsModel({ rankingId: 4, season: 1, team: 4})
        await RankingsModel.create(rankingToUpdate)
        const data = { team: 5 }

        const response = await request(app).put('/rankings/4/seasons/1').send(data)
        const ranking = await RankingsModel.findOne({ rankingId: 4, season: 1 })

        expect(response.status).toBe(200)
        expect(ranking.team).toBe(5)
    })

    it('It should create ranking', async () => {
        const rankingToCreate = new RankingsModel({ rankingId: 5, season: 1, team: 23})

        const response = await request(app).post('/rankings').send(rankingToCreate)
        const ranking = await RankingsModel.findOne({ rankingId: 5, season: 1 })

        expect(response.status).toBe(200)
        expect(ranking.team).toBe(23)
    })
})
