
// use PORT from .env file only when running locally, in production, Fly.io defines the PORT 
// dynamically via it's own environment variable
if (process.env.NODE_ENV !== 'production') {
    console.log('development environment..')
    require('dotenv').config();
}
const express = require('express')                          // import express and create 'express' function
const morgan = require('morgan')                            // request logger middleware
const phoneBookRouter = require('./routes/phonebook.route') // routes

const app = express()               // create express application with 'express' function
app.use(express.json())             // activate the json-parser for POST requests

const cors = require('cors')        // cors middleware
app.use(cors())

// Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called
morgan.token('request-log', function(req, res) {
    if (req.method === 'POST' && req.url === '/api/persons') {
        console.log('req.body', req.body)
        
        return JSON.stringify({ 
            name: req.body.name, 
            number: req.body.number 
        }
    )}

    return '- agent: ' + req.headers['user-agent']
})

app.use(morgan(':method :url :status - :response-time ms :request-log'))

// route for site root
app.get('/', (req, res) => {
    res.send('<h1>Hello World from Backend API root, API is now running...</h1>')    
})

// phone book routes
app.use('/', phoneBookRouter)

// route for unknown endpoints
const unknownEndpoint = (request, response) => {
    console.log("error: 'unknown endpoint'")
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// - try to get value for PORT 
//   - if api is not running in production, process.env.port tries to read it from enviroment variable
//      - if environment variable is not defined, try to read it from .env file       
//   - if app is running in production, Fly.io will try to read it only from environment variable (because dotenv is not in use)
//   - in either case, if PORT does not have the value defined, default to 3001
//
//     PATH in environment -> PATH in .env file -> default 3001 
//

console.log('process.env.port:', process.env.port)
const PORT = process.env.port || 3001


// start the application
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`open: http://localhost:${PORT}`)
})