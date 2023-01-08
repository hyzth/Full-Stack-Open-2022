const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/await simplifies making async calls',
    author: 'Anon',
    url: 'https://foobar.com',
    like: 4
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAfterAddition.map(blog => blog.title)
  expect(titles).toContain('Async/await simplifies making async calls')
})

test('the likes property defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'Test',
    author: 'Anon',
    url: 'https://foobar.com'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  const addedBlog = blogsAfterAddition.find(blog => blog.title === 'Test')

  expect(addedBlog.likes).toEqual(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Anon',
    url: 'https://foobar.com',
    likes: 5
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterAddition = await helper.blogsInDb()
  expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsBeforeDeletion = await helper.blogsInDb()
  const blogToDelete = blogsBeforeDeletion[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDeletion = await helper.blogsInDb()
  expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAfterDeletion.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('an existing blog can be updated', async () => {
  const blogsBeforeUpdate = await helper.blogsInDb()
  const blogToUpdate = blogsBeforeUpdate[0]
  blogToUpdate.likes = 13

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAfterUpdate = await helper.blogsInDb()
  expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length)

  const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
