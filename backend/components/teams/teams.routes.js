const express = require("express");
const routes = express.Router();
const teamsController = require('./teams.controller.js');


routes.get('/', teamsController.findAll)
routes.get('/:teamId', teamsController.findOne)
routes.delete('/:teamId', teamsController.delete)
routes.put('/:teamId', teamsController.update)
routes.post('/', teamsController.create)

module.exports = (app) => {
    app.use('/teams', routes)
}