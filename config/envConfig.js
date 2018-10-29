const devConfig = {
    DB_URL: 'mongodb://localhost:27017/nfldb',
    PORT: process.env.PORT || 3000
}
const testConfig = {}
const prodConfig = {}
const defaultConfig = {
    DB_URL: 'mongodb://localhost:27017/nfldb',
    PORT: process.env.PORT || 3000
}

module.exports = () => {
        switch (process.env.NODE_ENV) {
            case 'development':
                return devConfig
            case 'test':
                return testConfig
            case 'production':
                return prodConfig
            default:
                return devConfig
    }
}

