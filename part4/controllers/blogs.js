const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = req.user
  if (!user) {
    res.status(401).json({ error: 'token is missing or invalid' })
  }
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  if (!user) {
    res.status(401).json({ error: 'token is missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(400).json({ error: 'no blog with such id' })
  } else if (blog.user.toString() !== user.id.toString()) {
    res.status(403).json({ error: 'unauthorized operation' })
  } else {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter

