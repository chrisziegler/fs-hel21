const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { config, logger, middleware } = require('./utils')
const blogsRouter = require('./controllers/blogs')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB Atlas'))
  .catch(error =>
    logger.error('error connecting to MongoDB', error.message),
  )

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app