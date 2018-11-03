const express = require("express");
const routes = express.Router();
const championsController = require('./champions.controller.js');
routes.get('/', championsController.findAll)

module.exports = (app) => {
    app.use('/champions', routes)
}