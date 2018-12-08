process.env.NODE_ENV = 'test'
const request = require('supertest')
require('../../config/dbConfig.js')
const mongoose = require('mongoose')
const app = require('../../app.js')

const TeamsModel = require('./teams.model.js')
const teams = [
    new TeamsModel({
        team: 1,
        name: 'PATRIOTS',
        city: 'NEW ENGLAND',
        stadium: 'GILLETTE',
        conference: 'AFC',
        division: 'NORTH'
    }),
    new TeamsModel({
        team: 2,
        name: 'BALTIMORE',
        city: 'RAVENS',
        stadium: 'Stadium',
        conference: 'AFC',
        division: 'NORTH'
    })
]

beforeEach(async () => {
    jest.setTimeout(10000)
    await TeamsModel.insertMany(teams)
})

afterEach(async () => {
    await TeamsModel.remove({})
})

describe('testing the teams resource crud operations', () => {
    it('It should return all teams', async () => {
        const response = await request(app).get('/teams')
        const res = JSON.stringify(response.body)

        expect(res).toEqual(JSON.stringify(teams))
        expect(response.statusCode).toBe(200)
    })

    it('It should return one team', async () => {
        const team = new TeamsModel({
            team: 7,
            name: 'PATRIOTS',
            city: 'NEW ENGLAND',
            stadium: 'GILLETTE',
            conference: 'AFC',
            division: 'NORTH'
        })
        team.save()

        const response = await request(app).get('/teams/' + team._id)

        expect(response.body.name).toBe('PATRIOTS')
        expect(response.body.city).toBe('NEW ENGLAND')
        expect(response.body.division).toBe('NORTH')
        expect(response.body.stadium).toBe('GILLETTE')
        expect(response.body.team).toBe(7)
        expect(response.body.conference).toBe('AFC')
    })

    it('It should delete team', async () => {
        const teamToDelete = new TeamsModel({
            team: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await teamToDelete.save()

        const response = await request(app).delete('/teams/' + teamToDelete._id)
        const team = await TeamsModel.findById(teamToDelete._id)

        expect(team).toBeNull()
        expect(response.status).toBe(200)
    })

    it('It should update team', async () => {
        const teamToUpdate = new TeamsModel({
            team: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await teamToUpdate.save()
        const data = { stadium: 'Stadium' }

        const response = await request(app).put('/teams/' + teamToUpdate._id).send(data)

        expect(response.status).toBe(200)
        expect(response.body.stadium).toBe('Stadium')
    })

    it('It should create team', async () => {
        const teamToCreate = new TeamsModel({
            team: 5, name: 'TEXANS', city: 'HOUSTON',
            stadium: 'stadium', conference: 'AFC', division: 'NORTH'
        })

        const response = await request(app).post('/teams').send(teamToCreate)

        expect(response.status).toBe(200)
        expect(response.body.city).toBe('HOUSTON')
        expect(response.body.conference).toBe('AFC')
        expect(response.body.division).toBe('NORTH')
    })
})

describe('testing the teams resource, the errors', () => {

    it('It should return 404 when team to get not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).get('/teams/' + id)
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to update not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).put('/teams/' + id).send({})
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to delete not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).delete('/teams/' + id)
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to create not valid', async () => {
        const response = await request(app).post('/teams').send({})
        expect(response.status).toBe(403)
    })
})