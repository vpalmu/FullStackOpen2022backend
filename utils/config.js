const logger = require('../utils/logger')

// use PORT from .env file only when running locally. In production, Fly.io defines the PORT
// dynamically via it's own environment variable
//
if (process.env.NODE_ENV !== 'production') {
    logger.info('development environment..')
    // With dotenv usage, the environment variables defined in the .env file override the values in defined in environment (OS)
    require('dotenv').config()
    logger.info('process.env.PORT:', process.env.PORT)
    logger.info('process.env.MONGODB_URI:', process.env.MONGODB_URI)
}

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}