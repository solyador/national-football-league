const express = require("express");
const routes = express.Router();
const championsController = require('./champions.controller.js');

routes.get('/', championsController.findAll)
routes.get('/:seasonId', championsController.findOne)
routes.post('/', championsController.create)

module.exports = (app) => {
    app.use('/champions', routes)
}