const express = require("express");
const routes = express.Router();
const teamsController = require('./teams.controller.js');
routes.get('/', teamsController.findAll)

module.exports = (app) => {
    app.use('/teams', routes)
}