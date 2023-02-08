const logger = require('../utils/logger')

// use PORT from .env file only when running locally. In production, Fly.io defines the PORT
// dynamically via it's own environment variable
if (process.env.NODE_ENV !== 'production') {
    logger.info('development environment..')
    require('dotenv').config()
    logger.info('process.env.PORT:', process.env.PORT)
    logger.info('process.env.MONGODB_URI:', process.env.MONGODB_URI)
}

//--------------------------------------------------
// - try to get value for PORT
//   - if api is not running in production, process.env.port tries to read it from enviroment variable (OS)
//      - if environment variable (OS) is not defined, try to read it from .env file
//   - if app is running in production, Fly.io will try to read it only from environment variable (because dotenv is not in use)
//   - in either case, if PORT does not have the value defined, default to 3001
//
//     PATH in environment (OS) -> PATH in .env file -> default 3001
//
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}