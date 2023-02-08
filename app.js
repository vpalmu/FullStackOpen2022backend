const express = require('express')                          // import express and create 'express' function
const app = express()                                       // create express application with 'express' function
const cors = require('cors')                                // cors middleware
const morgan = require('morgan')                            // request logger middleware
const phoneBookRouter = require('./routes/phonebook.route') // routes
const middleware = require('./utils/middleware')

app.use(cors())

//--------------------------------------------------
// Whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding
// to the request's address. If a correct file is found, express will return it.
// Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will
// show the React frontend.
// GET requests to the address www.serversaddress.com/api/notes will be handled by the backend's code.
//
app.use(express.static('build'))    // load 'build' folder as a static content (frontend app production version compiled)
app.use(express.json())             // activate the json-parser for POST requests

//--------------------------------------------------
// Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called
//
morgan.token('request-log', middleware.requestLogger)
app.use(morgan(middleware.requestLoggerParams))

//--------------------------------------------------
// route for site root
app.get('/', (req, res) => { res.send('<h1>Hello World from Backend API root, API is now running...</h1>') })
// phone book routes
app.use('/', phoneBookRouter)
// route for unknown endpoints
app.use(middleware.unknownEndpoint)

// this has to be the last loaded middleware.
app.use(middleware.errorHandler)

module.exports = app
