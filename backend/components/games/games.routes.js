const express = require("express")
const routes = express.Router()
const gamesController = require('./games.controller.js')


routes.get('/', gamesController.findAll)
routes.get('/:id', gamesController.findOne)
routes.delete('/:id', gamesController.delete)
routes.put('/:id', gamesController.update)
routes.post('', gamesController.create)

module.exports = (app) => {
    app.use('/games', routes)
}