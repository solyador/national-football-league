const express = require("express")
const routes = express.Router()
const rankingsController = require('./rankings.controller.js')


routes.get('/seasons/:season', rankingsController.findAll)
routes.get('/:rankingId/seasons/:season', rankingsController.findOne)
routes.delete('/:rankingId/seasons/:season', rankingsController.delete)
routes.put('/:rankingId/seasons/:season', rankingsController.update)
routes.post('/', rankingsController.create)

module.exports = (app) => {
    app.use('/rankings', routes)
}