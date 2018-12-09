const express = require("express")
const routes = express.Router()
const teamsController = require('./teams.controller.js')


routes.get('/', teamsController.findAll)
routes.get('/:id', teamsController.findOne)
routes.delete('/:id', teamsController.deleteOne)
routes.put('/:id', teamsController.update)
routes.post('/', teamsController.create)

module.exports = (app) => {
    app.use('/teams', routes)
}