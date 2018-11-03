const express = require('express')
const middleWareConfig = require('./config/middlewareConfig.js')
const championsRoutes = require('./components/champions/champions.routes.js') 
const app = express()

championsRoutes(app)
middleWareConfig(app)

app.get('/', (req, res) => {
    res.status(200).send('National footlball league')
})
module.exports = app