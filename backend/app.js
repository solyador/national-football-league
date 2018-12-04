const express = require('express')
const middleWareConfig = require('./config/middlewareConfig.js')
const championsRoutes = require('./components/champions/champions.routes.js') 
const teamsRoutes = require('./components/teams/teams.routes.js') 
const seasonsRoutes = require('./components/seasons/seasons.routes.js') 
const app = express()

middleWareConfig(app)
championsRoutes(app)
teamsRoutes(app)
seasonsRoutes(app)

module.exports = app