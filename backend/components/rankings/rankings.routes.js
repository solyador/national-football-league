const express = require("express")
const routes = express.Router()
const rankingsController = require('./rankings.controller.js')


routes.get('/', rankingsController.findAll)
routes.get('/:id', rankingsController.findOne)
routes.delete('/:id', rankingsController.deleteOne)
routes.put('/:id', rankingsController.update)
routes.post('/', rankingsController.create)

module.exports = (app) => {
    app.use('/rankings', routes)
}