const app = require('./app')
const config = require('./config/envConfig.js')()
require('./config/dbConfig.js')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}/`)
})
