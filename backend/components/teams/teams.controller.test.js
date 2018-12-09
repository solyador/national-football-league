process.env.NODE_ENV = 'test'
require('../../config/db/dbConfig.js')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app.js')
const TeamsModel = require('./teams.model.js')

describe('testing the teams resource crud operations', () => {
    beforeEach(async () => {
        jest.setTimeout(10000)
    })
    
    afterEach(async () => {
        await TeamsModel.remove({})
    })
    
    test('It should return all teams', async () => {
        const teams = [
            new TeamsModel({
                teamId: 1,
                name: 'PATRIOTS',
                city: 'NEW ENGLAND',
                stadium: 'GILLETTE',
                conference: 'AFC',
                division: 'NORTH'
            }),
            new TeamsModel({
                teamId: 2,
                name: 'BALTIMORE',
                city: 'RAVENS',
                stadium: 'Stadium',
                conference: 'AFC',
                division: 'NORTH'
            })
        ]
        await TeamsModel.insertMany(teams)
        const response = await request(app).get('/teams')
        const res = JSON.stringify(response.body)

        expect(res).toEqual(JSON.stringify(teams))
        expect(response.statusCode).toBe(200)
    })

    test('It should return one team', async () => {
        const team = new TeamsModel({
            teamId: 7,
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
        expect(response.body.teamId).toBe(7)
        expect(response.body.conference).toBe('AFC')
    })

    test('It should delete team', async () => {
        const teamToDelete = new TeamsModel({
            teamId: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await teamToDelete.save()

        const response = await request(app).delete('/teams/' + teamToDelete._id)
        const team = await TeamsModel.findById(teamToDelete._id)

        expect(team).toBeNull()
        expect(response.status).toBe(200)
    })

    test('It should update team', async () => {
        const teamToUpdate = new TeamsModel({
            teamId: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await teamToUpdate.save()
        const data = { stadium: 'Stadium' }

        const response = await request(app).put('/teams/' + teamToUpdate._id).send(data)

        expect(response.status).toBe(200)
        expect(response.body.stadium).toBe('Stadium')
    })

    test('It should create team', async () => {
        const teamToCreate = new TeamsModel({
            teamId: 5, name: 'TEXANS', city: 'HOUSTON',
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

    test('It should return 404 when team to get not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).get('/teams/' + id)
        expect(response.status).toBe(404)
    })

    test('It should return 404 when team to update not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).put('/teams/' + id).send({})
        expect(response.status).toBe(404)
    })

    test('It should return 404 when team to delete not exists', async () => {
        const id = mongoose.Types.ObjectId()
        const response = await request(app).delete('/teams/' + id)
        expect(response.status).toBe(404)
    })
})