const express = require('express')
const middleWareConfig = require('./config/middleware/middlewareConfig.js')
const seasonsRoutes = require('./components/seasons/seasons.routes.js')
const teamsRoutes = require('./components/teams/teams.routes.js')
const rankingsRoutes = require('./components/rankings/rankings.routes.js')
const gamesRoutes = require('./components/games/games.routes.js')
const standingsRoutes = require('./components/standings/standings.routes.js')

const app = express()

middleWareConfig(app)
seasonsRoutes(app)
teamsRoutes(app)
rankingsRoutes(app)
gamesRoutes(app)
standingsRoutes(app)

module.exports = app