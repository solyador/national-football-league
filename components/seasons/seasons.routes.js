const express = require("express");
const routes = express.Router();
const seasonsController = require('./seasons.controller.js');
routes.get('/', seasonsController.findAll)

module.exports = (app) => {
    app.use('/seasons', routes)
}