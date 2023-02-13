/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two persons', async () => {
    const response = await api.get('/api/persons')

    expect(response.body).toHaveLength(11)
})

afterAll(async () => {
    await mongoose.connection.close()
})