const express = require("express")
const routes = express.Router()
const standingsController = require('./standings.controller.js')


routes.get('/', standingsController.findAll)
routes.get('/:id', standingsController.findOne)
routes.delete('/:id', standingsController.delete)
routes.put('/:id', standingsController.update)
routes.post('/', standingsController.create)

module.exports = (app) => {
    app.use('/standings', routes)
}