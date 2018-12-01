const devConfig = {
    DB_URL: 'mongodb://localhost:27017/nfldb',
    PORT: process.env.PORT || 3000
}

const testConfig = {
    DB_URL: 'mongodb://localhost:27017/nfldb_test',
    PORT: process.env.PORT || 3000
}

const prodConfig = {
    DB_URL: 'mongodb://solo2902:solo2902@ds111319.mlab.com:11319/nfldb',
    PORT: process.env.PORT || 3000
}

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

