process.env.NODE_ENV = 'test'
const request = require('supertest')
require('../../config/dbConfig.js')
const app = require('../../app.js')

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

describe('testing the teams resource crud operations', () => {
    it('It should return all teams', async () => {
        const response = await request(app).get('/teams')
        const res = JSON.stringify(response.body)
        const champs = JSON.stringify(teams)
        expect(res).toEqual(champs)
        expect(response.statusCode).toBe(200)
    })

    it('It should return one team', async () => {
        const response = await request(app).get('/teams/1')
        expect(response.body.name).toBe('PATRIOTS')
    })

    it('It should delete team', async () => {
        const teamToDelete = new TeamsModel({
            teamId: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await TeamsModel.create(teamToDelete)

        const response = await request(app).delete('/teams/4')
        const team = await TeamsModel.findOne({ name: 'CHIEFS' })

        expect(team).toBeNull()
        expect(response.status).toBe(200)
    })

    it('It should update team', async () => {
        const teamToUpdate = new TeamsModel({
            teamId: 4, name: 'CHIEFS', city: 'CANSAS CITY',
            stadium: 'GILLETTE', conference: 'AFC', division: 'NORTH'
        })
        await TeamsModel.create(teamToUpdate)
        const data = { stadium: 'Stadium' }

        const response = await request(app).put('/teams/4').send(data)
        const team = await TeamsModel.findOne({ name: 'CHIEFS' })

        expect(response.status).toBe(200)
        expect(team.stadium).toBe('Stadium')
    })

    it('It should create team', async () => {
        const teamToCreate = new TeamsModel({
            teamId: 5, name: 'TEXANS', city: 'HOUSTON',
            stadium: 'stadium', conference: 'AFC', division: 'NORTH'
        })

        const response = await request(app).post('/teams').send(teamToCreate)
        const team = await TeamsModel.findOne({ name: 'TEXANS' })

        expect(response.status).toBe(200)
        expect(team.city).toBe('HOUSTON')
        expect(team.conference).toBe('AFC')
        expect(team.division).toBe('NORTH')
    })
})

describe('testing the teams resource, the errors', () => {
    
    it('It should return 404 when team to get not exists', async () => {
        const response = await request(app).get('/teams/3')
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to update not exists', async () => {
        const response = await request(app).put('/teams/3').send({})
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to delete not exists', async () => {
        const response = await request(app).delete('/teams/3')
        expect(response.status).toBe(404)
    })

    it('It should return 404 when team to create not valid', async () => {
        const response = await request(app).post('/teams').send({})
        expect(response.status).toBe(403)
    })
})