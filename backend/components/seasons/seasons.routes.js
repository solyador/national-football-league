const express = require("express")
const routes = express.Router()
const seasonsController = require('./seasons.controller.js')


routes.get('/', seasonsController.findAll)
routes.get('/:seasonId', seasonsController.findOne)
routes.delete('/:seasonId', seasonsController.delete)
routes.put('/:seasonId', seasonsController.update)
routes.post('/', seasonsController.create)

module.exports = (app) => {
    app.use('/seasons', routes)
}