const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1, author: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const existingUser = await User.findOne({ username: body.username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }
  if (!body.password) {
    return res.status(400).json({ error: 'password is required' })
  } else if (body.password.length < 3) {
    return res.status(400).json({ error: 'password must have at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400).json({ error: 'no user with such id' })
  } else {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
})


module.exports = usersRouter