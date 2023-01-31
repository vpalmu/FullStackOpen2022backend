// Implements simple in-memory storage for Person data
// used for early development before Mongo DF.

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

function allPersons() {
  return persons
}

function personsCount() {
  return persons.length
}

function findPerson(id) {
  return persons.find(p => p.id === id); // return 'undefined' if person not found
}

function deletePerson(id) {
  persons = persons.filter(p => p.id !== id) 
}

function createNewPerson(pId, pName, pNumber) {
  const newPerson = { 
      id: pId, 
      name: pName, 
      number: pNumber 
  }

  return newPerson
}

function addPerson(personToAdd) {
  persons = persons.concat(personToAdd)
}

function nameExists(name) {
  return persons.some(n => n.name === name)
}

module.exports = {
  allPersons,
  personsCount,
  findPerson,
  deletePerson,
  createNewPerson,
  addPerson,
  nameExists
}