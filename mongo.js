// This code is a helper file for testing connectivity with Mongo DB.
// It checks the number of arguments passed to it and if the correct number of arguments are passed,
// it will either add a new person to the database or print out all the people in the database.
// If not enough or too many arguments are passed, it will exit with an error message.
//
// to run the code: node mongo <Passworkd>
//              or: node mongo <Passworkd> Testi-Jamppa 9289827
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('Args:', process.argv)

if (process.argv.length<3) {
    logger.info('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

let addNewPerson = false
let newPersonName = ''
let newPersonNumber = ''


if (process.argv.length === 4) {
    logger.info('too few arguments, can\'t add new person')
    process.exit(1)
}

if (process.argv.length === 5) {
    logger.info('trying to add new person..')
    addNewPerson = true
    newPersonName = process.argv[3]
    newPersonNumber = process.argv[4]
}

if (process.argv.length>5) {
    logger.info('too many arguments')
    process.exit(1)
}


const url =
  `mongodb+srv://vpalmu:${password}@cluster0.uqdl3sk.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

if (addNewPerson === true) {
    logger.info('add new person..')
    const newPerson = new Person({
        name: newPersonName,
        number: newPersonNumber,
    })

    newPerson.save().then(result => {
        logger.info('person saved!')
        mongoose.connection.close()
    })
}
else {
    logger.info('phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
            logger.info(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
