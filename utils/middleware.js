const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const unknownEndpoint = (request, response) => {
    logger.info('error: \'unknown endpoint\'')
    response.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (request, response) => {
    if (request.method === 'POST' && request.url === '/api/persons') {
        logger.info('morgal request-log: POST /api/persons ', request.body.name)

        return JSON.stringify({
            number: request.body.number
        })
    }

    return '- agent: ' + request.headers['user-agent']
}

const requestLoggerParams = ':method :url :status - :response-time ms :request-log'

module.exports = {
    errorHandler,
    unknownEndpoint,
    requestLogger,
    requestLoggerParams
}