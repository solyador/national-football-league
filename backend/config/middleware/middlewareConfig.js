const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

const isDev = process.env.NODE_ENV === 'development'

module.exports = (app) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded( { extended: true }))

    if (isDev) {
        app.use(morgan('combined'))
    }
}