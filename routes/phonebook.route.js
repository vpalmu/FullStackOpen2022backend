const express = require('express')
const router = express.Router()
const phonebookController = require('../controllers/phonebook.controller')

router.get('/info', phonebookController.getInfo)
router.get('/api/persons', phonebookController.getAll)
router.get('/api/persons/:id', phonebookController.getPerson)
router.delete('/api/persons/:id', phonebookController.deletePerson)
router.post('/api/persons', phonebookController.createPerson)
router.put('/api/persons/:id', phonebookController.updatePerson)

module.exports = router