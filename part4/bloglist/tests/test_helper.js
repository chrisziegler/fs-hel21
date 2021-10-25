const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = userid => {
  return [
    {
      title: 'This Cider House Really Rules',
      author: 'John Irving',
      url: 'http://www.john-irving.com',
      likes: 4,
      date: new Date(),
      user: userid,
    },
    {
      title: 'Texas motto: LADIES WE KNOW WHATS BEST FOR YOU',
      author: 'Stephen King',
      url: 'http://www.stephenking.com',
      likes: 3,
      date: new Date(),
      user: userid,
    },
  ]
}

const initialUser = async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'admin',
    name: 'Robert Johnson',
    passwordHash,
  })

  await user.save()
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'testing purposes',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
