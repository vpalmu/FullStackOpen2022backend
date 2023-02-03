
// use PORT from .env file only when running locally, in production, Fly.io defines the PORT 
// dynamically via it's own environment variable
if (process.env.NODE_ENV !== 'production') {
    console.log('development environment..')
    require('dotenv').config();
}

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
        console.log('morgal request-log: POST /api/persons ', req.body.name)
        
        return JSON.stringify({ 
            name: req.body.name, 
            number: req.body.number 
        }
    )}

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
    console.log("error: 'unknown endpoint'")
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//--------------------------------------------------
// Error handlers
//
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
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

//--------------------------------------------------
// - try to get value for PORT 
//   - if api is not running in production, process.env.port tries to read it from enviroment variable
//      - if environment variable is not defined, try to read it from .env file       
//   - if app is running in production, Fly.io will try to read it only from environment variable (because dotenv is not in use)
//   - in either case, if PORT does not have the value defined, default to 3001
//
//     PATH in environment -> PATH in .env file -> default 3001 
//
console.log('process.env.port:', process.env.port)
const PORT = process.env.PORT || 3001

// start the application
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`open: http://localhost:${PORT}`)
})