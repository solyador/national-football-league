const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

isDev = process.env.NODE_ENV === 'development'
isProd = process.env.NODE_ENV === 'production'

module.exports = (app) => {

    app.use(bodyParser.json()),
    app.use(bodyParser.urlencoded( { extended: true }))

    if (isDev) {
        app.use(morgan('combined'))
    }
}