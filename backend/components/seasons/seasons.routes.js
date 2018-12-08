const express = require("express")
const routes = express.Router()
const seasonsController = require('./seasons.controller.js')


routes.get('/', seasonsController.findAll)
routes.get('/:id', seasonsController.findOne)
routes.delete('/:id', seasonsController.delete)
routes.put('/:id', seasonsController.update)
routes.post('/', seasonsController.create)

module.exports = (app) => {
    app.use('/seasons', routes)
}