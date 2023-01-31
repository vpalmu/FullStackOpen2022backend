
const ps = require('../services/persons.service')
const utils = require('../utils/helper.util')
const Person = require('../models/person')

async function getInfo(req, res) {
    try {
        res.send(`<p>Phonebook has info for ${ps.personsCount()} people</p>
                  <p>${utils.getCurrentTimestamp()}</p>`)    
    } catch (err) {
        console.error(`Error while getting info`, err.message)
    }
}

async function getAll(req, res, next) {
    try {
        Person.find({}).then(persons => {
            console.log(persons)
            res.json(persons)
            })
    } catch (err) {
        console.error(`Error while getting all persons`, err.message)
        next(err)
    }
}

async function getPerson(req, res, next) {
    try {
        const id = Number(req.params.id)
        const person = ps.findPerson(id)

        if (person) {
            console.log(person)
            res.json(person)
        } else {
            // 'undefined' value
            res.statusMessage = `person with id: ${req.params.id} doesn't exist`
            res.status(404).end()  // resource not found
        }  
    } catch (err) {
        console.error(`Error while getting person`, err.message)
        next(err)
    }
}

async function deletePerson(req, res, next) {
    try {
        console.log('request.params.id', req.params.id)
        const id = Number(req.params.id)
    
        const person = ps.findPerson(id)
    
        if (person) {
            // delete
            ps.deletePerson(person.id)
    
            console.log(`person '${person.id}' was deleted`)
            res.status(204).end()
        } else {
            // 'undefined' value
            console.log(`person not found, id: ${req.params.id}`)
            res.statusMessage = `person with id: ${req.params.id} doesn't exist`
            res.status(404).end()  // resource not found
        }
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

        // validate name field
        if (!body.name || body.name.length === 0) {
            return response.status(400).json({ error: 'name missing' })
        }

        if (ps.nameExists(body.name)) {
            return response.status(500).json({ error: 'name must be unique'})
        }

        // validate number field
        if (!body.number || body.number.length === 0) {
            return response.status(400).json({ error: 'number missing' })
        }

        const newPerson = ps.createNewPerson(utils.getRandomPersonId(1000), body.name, body.number)
        ps.addPerson(newPerson)

        console.log('created new person', newPerson)
        response.json(newPerson)
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
    createPerson
}