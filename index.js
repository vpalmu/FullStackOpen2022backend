const logger = require('./utils/logger')
const { PORT }  = require('./utils/config')

//--------------------------------------------------
const express = require('express')  // import express and create 'express' function
const app = express()               // create express application with 'express' function

//--------------------------------------------------
const cors = require('cors')        // cors middleware
app.use(cors())

//--------------------------------------------------
// Whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding
// to the request's address. If a correct file is found, express will return it.
// Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will
// show the React frontend.
// GET requests to the address www.serversaddress.com/api/notes will be handled by the backend's code.
//
app.use(express.static('build'))    // load 'build' folder as a static content (frontend app production version compiled)

//--------------------------------------------------
app.use(express.json())             // activate the json-parser for POST requests

//--------------------------------------------------
// Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called
//
const morgan = require('morgan')                            // request logger middleware
morgan.token('request-log', function(req, res) {
    if (req.method === 'POST' && req.url === '/api/persons') {
        logger.info('morgal request-log: POST /api/persons ', req.body.name)

        return JSON.stringify({
            number: req.body.number
        })
    }

    return '- agent: ' + req.headers['user-agent']
})

app.use(morgan(':method :url :status - :response-time ms :request-log'))

//--------------------------------------------------
// route for site root
//
app.get('/', (req, res) => {
    res.send('<h1>Hello World from Backend API root, API is now running...</h1>')
})

// phone book routes
const phoneBookRouter = require('./routes/phonebook.route') // routes

app.use('/', phoneBookRouter)

// route for unknown endpoints
const unknownEndpoint = (request, response) => {
    logger.info('error: \'unknown endpoint\'')
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//--------------------------------------------------
// Error handlers
//
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

// this has to be the last loaded middleware.
app.use(errorHandler)

// start the application
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
    logger.info(`open in broswer: http://localhost:${PORT}`)
})