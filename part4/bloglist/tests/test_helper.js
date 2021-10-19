const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This Cider House Really Rules',
    author: 'John Irving',
    url: 'http://www.john-irving.com',
    likes: 4,
    date: new Date(),
  },
  {
    title: 'Texas motto: LADIES WE KNOW WHATS BEST FOR YOU',
    author: 'Stephen King',
    url: 'http://www.stephenking.com',
    likes: 3,
    date: new Date(),
  },
]

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
