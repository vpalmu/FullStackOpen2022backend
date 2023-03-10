const mongoose = require('mongoose') // import mongoose Object Data Modeling (ODM) library
const logger = require('../utils/logger')
const { MONGODB_URI } = require('../utils/config')

mongoose.set('strictQuery', false)
logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(_ => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

// define schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{8,9}$/.test(v)
            },
            message: props => `${props.value} is not valid phone number`
        },
        required: true
    }
})

// override 'toJSON' for schema
// - '_v' field is not retured
// - '_Id' is returned as 'id'
//
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)