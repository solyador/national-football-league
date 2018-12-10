const request = require('supertest')
const app = require('../../app.js')
require('../../config//db/dbConfig.js')

const GamesModel = require('./games.model.js')
const games = [
    new GamesModel({ season: 1, week: 1, homeTeam: 1, awayTeam: 2 }),
    new GamesModel({ season: 1, week: 1, homeTeam: 3, awayTeam: 4 })
]

beforeEach(async () => {
    jest.setTimeout(10000)
    await GamesModel.insertMany(games)
})

afterEach(async () => {
    await GamesModel.remove({})
})

describe('test games controller', () => {

    test('It should return all games', async () => {
        const response = await request(app).get('/games/')
        const res = JSON.stringify(response.body)
        const gameList = JSON.stringify(games)
        expect(res).toEqual(gameList)
        expect(response.statusCode).toBe(200)
    })

    test('It should return a game', async () => {
        const game = new GamesModel({ season: 3, week: 11, homeTeam: 6, awayTeam: 12 })
        await game.save()
        const response = await request(app).get('/games/' + game._id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.homeTeam).toBe(6)
        expect(response.body.awayTeam).toBe(12)
    })

    test('It should delete game', async () => {
        const gameToDelete = new GamesModel({ season: 3, week: 1, homeTeam: 3, awayTeam: 2 })
        await gameToDelete.save()

        const response = await request(app).delete('/games/' + gameToDelete._id)

        const gameFound = await GamesModel.findById(gameToDelete._id)

        expect(gameFound).toBeNull()
        expect(response.status).toBe(200)
    })

    test('It should update game', async () => {
        let game = new GamesModel({
            season: 4,
            week: 1,
            homeTeam: 11,
            awayTeam: 21,
            homeTeamScore: 0,
            awayTeamScore: 0
        })
        await game.save()
        const response = await request(app).put('/games/' + game._id).send({ awayTeamScore: 5 })
        const updatedGame = await GamesModel.findById(game._id)
        expect(response.status).toBe(200)
        expect(updatedGame.awayTeamScore).toBe(5)
    })

    test('It should create game', async () => {
        const gameToCreate = new GamesModel({ season: 5, week: 1, homeTeam: 10, awayTeam: 2 })
        const response = await request(app).post('/games').send(gameToCreate)
        const game = await GamesModel.findById(response.body._id)

        expect(response.status).toBe(200)
        expect(game.season).toBe(5)
        expect(game.week).toBe(1)
        expect(game.homeTeam).toBe(10)
        expect(game.awayTeam).toBe(2)
    })
})
