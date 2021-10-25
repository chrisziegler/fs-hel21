const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const token = request.token
    // thanks to custom tokenExtractor & userExtractor middleware
    const user = request.user
    if (!user || !token) {
      return response.status(401).json({ error: '401 - unauthorized' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      date: new Date(),
      user: user._id,
    })

    if (!body.title || !body.url) {
      return response.status(400).end()
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      date: new Date(),
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      {
        new: true,
      },
    )
    response.json(updatedBlog)
    console.log(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete(
  '/:id',
  userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user
      const blog = await Blog.findById(request.params.id)
      // with userExtractor middleware instead of using !== decodedToken.id
      if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({
          error: 'only the original blog poster can delete this blog',
        })
      }
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  },
)

module.exports = blogsRouter
