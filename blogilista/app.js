const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

app.use(bodyParser.json())

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.logger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

/*app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  console.log('**')

  blog
    .save()
    .then(result => {
      console.log('***')
      response.status(201).json(result)
    })
})*/