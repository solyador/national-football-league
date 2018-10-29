const express = require('express')
const middleWareConfig = require('./config/middlewareConfig.js')

const app = express()
middleWareConfig(app)
app.get('/', (req, res) => {
    res.status(200).send('National footlball league')
})
module.exports = app