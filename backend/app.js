const express = require('express')
const middleWareConfig = require('./config/middlewareConfig.js')
const seasonsRoutes = require('./components/seasons/seasons.routes.js') 
const teamsRoutes = require('./components/teams/teams.routes.js') 

const app = express()

middleWareConfig(app)
seasonsRoutes(app)
teamsRoutes(app)
seasonsRoutes(app)

module.exports = app