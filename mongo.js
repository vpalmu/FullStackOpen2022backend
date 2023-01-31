// helper file for testing connectivity with Mongo DB
// to run the code: node mongo <Passworkd>
//              or: node mongo <Passworkd> Testi-Jamppa 9289827
const mongoose = require('mongoose')

console.log('Args:', process.argv)

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

let addNewPerson = false
let newPersonName = ''
let newPersonNumber = ''


if (process.argv.length === 4) {
    console.log('too few arguments, can\'t add new person')
    process.exit(1)
}

if (process.argv.length === 5) {
    console.log('trying to add new person..')
    addNewPerson = true
    newPersonName = process.argv[3]
    newPersonNumber = process.argv[4]
}

if (process.argv.length>5) {
    console.log('too many arguments')
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
    console.log('add new person..')
    const newPerson = new Person({
    name: newPersonName,
    number: newPersonNumber,
    })

    newPerson.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} 
else {
    console.log('phonebook:')

    Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        mongoose.connection.close()
    })
}
