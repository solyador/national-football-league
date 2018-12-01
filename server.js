const app = require('./backend/app')
const config = require('./backend/config/envConfig.js')()
const serveStatic = require('serve-static')
const path = require('path')

require('./backend/config/dbConfig.js')

app.use(serveStatic(path.join(__dirname, 'frontend/dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/dist/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/dist/index.html'))
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}/`)
})
