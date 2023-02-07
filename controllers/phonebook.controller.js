
const ps = require('../services/persons.service')
const utils = require('../utils/helper.util')
const Person = require('../models/person')

async function getInfo(req, res, next) {
    try {
        Person.countDocuments({}, (err, count) => {
            res.send(`<p>Phonebook has info for ${count} people</p>
                  <p>${utils.getCurrentTimestamp()}</p>`)    
        })
    } catch (err) {
        console.error(`Error while getting info`, err.message)
        next(err) // if next is not called, client won't receive error data, and will timeout eventually
    }
}

async function getAll(req, res, next) {
    try {
        Person.find({}).then(persons => {
            res.json(persons)
            })
    } catch (err) {
        console.error(`Error while getting all persons`, err.message)
        next(err)
    }
}

async function getPerson(req, res, next) {
    try {
        // if error is thrown here, it will be handled by catch { ... } block
        // but mongoose errors will be handled in .catch clause
        //throw new Error('this is a test')

        const id = req.params.id
        console.log('find by Id:', id)
        Person.findById(id)
            .then(person => {
                if (person) {
                    console.log('Person found:',person.name)
                    res.json(person)
                } else {
                    // 'undefined' value
                    const errMessage = `person with id: ${req.params.id} doesn't exist`

                    console.log(errMessage)
                    res.statusMessage = errMessage
                    res.status(404).end()  // resource not found
                }
            })
            .catch(error => {
                console.log(error)
                next(error) // pass errors to express
            })
    } catch (err) {
        console.error(`Error while getting person`, err.message)
        next(err)
}
}

async function deletePerson(req, res, next) {
    try {
        console.log('request.params.id', req.params.id)
        
        Person.findByIdAndRemove(req.params.id)
            .then(result => {
                if (result) {
                    console.log(`person was deleted`)
                    return res.status(204).end()
                }
                console.log(`person not found, id: ${req.params.id}`)
                res.statusMessage = `person doesn't exist`
                return res.status(404).end()  // resource not found
            })
            .catch(err => {
                next(err)
            })
    } catch (err) {
        console.error(`Error while deleting person`, err.message)
        next(err)
    }
}

async function createPerson(request, response, next) {
    try {
        // data is expected to be in JSON format, must set 'Content-Type=application/json' in PostMan 'Headers'
        const body = request.body
        console.log('body', body)

        if (utils.isEmptyObject(body)) {
            return response.status(400).json({ error: 'content missing' })
        }

        // check if person with same name exists
        const sameNameExists = await Person.exists({ name: body.name });
        
        if (sameNameExists) {
            const message = `person '${request.body.name}' already exists`
            console.log(message)
            response.statusMessage = message
            return response.status(400).end()  // bad request
        }

        const newPerson = new Person(
            {
                name: body.name,
                number: body.number
            }
        )

        newPerson
            .save().then(
                    result => {
                        console.log('added entry for new person', newPerson.name)
                        return response.json(newPerson)
                    }
                )   
                .catch(err => {
                    next(err)
                })
    } 
    catch (err) {
        console.error(`Error while deleting person`, err.message)
        next(err)
    }
}

async function updatePerson(request, response, next) {
    try {
        // data is expected to be in JSON format, must set 'Content-Type=application/json' in PostMan 'Headers'
        const body = request.body

        if (utils.isEmptyObject(body)) {
            return response.status(400).json({ error: 'content missing' })
        }

        const personToUpdate = ps.createNewPersonObject(body.name, body.number)
        const opts = { runValidators: true };

        Person.findByIdAndUpdate(request.params.id, personToUpdate, { new: true, runValidators: true })
            .then(result => {
                if (result) {
                    console.log('update result:', result)
                    return response.json(result)
                }

                console.log(`person not found, id: ${request.params.id}`)
                response.statusMessage = `person doesn't exist`
                return response.status(404).end()  // resource not found
            })
            .catch(err => next(err))
    }
    catch (err) {
        console.error(`Error while deleting person`, err.message)
        next(err)
    }
}

module.exports = { 
    getInfo, 
    getAll, 
    getPerson, 
    deletePerson, 
    createPerson,
    updatePerson
}