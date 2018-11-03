const mongoose = require('mongoose')
const envConfig = require('./envConfig.js')

mongoose.Promise = global.Promise
const url = envConfig(process.env.NODE_ENV).DB_URL
try {
    mongoose.connect(url, { useNewUrlParser: true })
} catch (err) {
    console.log('cannot connect to db')
}

mongoose.connection.once('open', () => console.log('mongodb running ', url))
                   .on('error', err => {
                       throw err
                   })
