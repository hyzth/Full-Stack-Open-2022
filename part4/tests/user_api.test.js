const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany()

  const passwordHash = await bcrypt.hash('supersekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation of a new user succeeds', async () => {
  const usersBeforeAddition = await helper.usersInDb()

  const newUser = {
    username: 'jsbach',
    name: 'Johann Sebastian Bach',
    password: 'salainen'
  }

  await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAfterAddition = await helper.usersInDb()
  expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length + 1)

  const usernames = usersAfterAddition.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('creation fails if username is not unique', async () => {
  const usersBeforeAddition = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen'
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(result.body.error).toContain('username must be unique')

  const usersAfterAddition = await helper.usersInDb()
  expect(usersAfterAddition).toEqual(usersBeforeAddition)
})

test('creation fails if password is missing', async () => {
  const usersBeforeAddition = await helper.usersInDb()

  const newUser = {
    username: 'rwagner',
    name: 'Richard Wagner',
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  expect(result.body.error).toContain('password is required')

  const usersAfterAddition = await helper.usersInDb()
  expect(usersAfterAddition).toEqual(usersBeforeAddition)
})

afterAll(() => {
  mongoose.connection.close()
})