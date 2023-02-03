// simple service class

function createNewPersonObject(pName, pNumber) {
  const newPerson = { 
      name: pName, 
      number: pNumber 
  }

  return newPerson
}

module.exports = {
  createNewPersonObject
}