const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('exisitence of unique identifier property "id"', async () => {
  const blogs = await api.get('/api/blogs')
  const { body } = blogs
  expect(body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  // const blogsBefore = await helper.blogsInDb()
  const newBlog = {
    title: 'How I built a modern website in 2021',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('How I built a modern website in 2021')
})

test('likes defaults to 0 when not missing from request', async () => {
  const newBlog = {
    title: 'How I built a modern website in 2021',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021',
  }

  await api.post('/api/blogs').send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
  expect(lastBlog.likes).toBe(0)
})

test('Server responds with 400 Bad Request if title and url properties missing from  request', async () => {
  const newBlog = {
    title: '',
    author: 'Kent C. Dodds',
    url: '',
    likes: 0,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map(b => b.title)
  expect(title).toContain('This Cider House Really Rules')
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

afterAll(() => {
  mongoose.connection.close()
})
