const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token

beforeEach(async () => {
  await User.deleteMany({})
  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
  await helper.initialUser()
  const users = await helper.usersInDb()
  const id = users[0].id
  const login = await api
    .post('/api/login')
    .send({ username: 'admin', password: 'sekret' })

  token = login.body.token

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs(id))
})

describe('WHEN THERE ARE INITIALLY A FEW NOTES SAVED', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsAtStart.length)
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

  test('exisitence of unique identifier property "id"', async () => {
    const blogs = await api.get('/api/blogs')
    const { body } = blogs
    expect(body[0].id).toBeDefined()
  })
})

describe('ADDITION OF A NEW NOTE', () => {
  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'How I built a modern website in 2021',
      author: 'Kent C. Dodds',
      url: 'https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('How I built a modern website in 2021')
  })

  test('likes defaults to 0 when not missing from request', async () => {
    const newBlog = {
      title: 'How I built a modern website in 2021',
      author: 'Kent C. Dodds',
      url: 'https://kentcdodds.com/blog/how-i-built-a-modern-website-in-2021',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)

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

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400)
  })
})

// revamped beforeAll so initialBlogs all have admin as user key for id.toString()
describe.skip('UPDATING AND REMOVING BLOGS', () => {
  test('a PUT request returns blog with updated Likes', async () => {
    const blogsBefore = await helper.blogsInDb()
    const originalBlog = blogsBefore[0]

    const updatedBlog = {
      title: 'This Cider House Really Rules',
      author: 'John Irving',
      url: 'http://www.john-irving.com',
      likes: 5,
    }
    const returnedBlog = await api.put(
      `/api/blogs/${originalBlog.id}`,
      updatedBlog,
    )
    expect(200)
    console.log(returnedBlog.body)
    // expect(returnedBlog.likes).toEqual(originalBlog.likes + 1)
  })
  test('Deleting a blog removes blog from DB', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toEqual(blogsBefore.length - 1)
  })
})

// test('only the original blog poster can delete a blog')

describe('WHEN THERE IS INITIALLY ONE USER IN DB', () => {
  test('a user with valid info can be created', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'firstUser',
      name: 'Chris Ziegler',
      password: 'hunter2',
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('a non-unique username returns the appropriate status and error', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'admin',
      name: 'Not the first admin',
      password: 'hunter2',
    }
    const result = await api.post('/api/users').send(user).expect(500)

    expect(result.body.message).toContain('Username already exists!')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
