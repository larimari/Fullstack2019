const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

blogRouter.post('/', async (request, response, next) => {
    const blog = request.body
    const token = getTokenFrom(request)
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        console.log('user', user)

        if (!blog.title || !blog.url) {
            return response.status(400).json({ error: 'title tai url puuttuu' })
        }

        const newBlog = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes === undefined ? 0 : blog.likes,
            user: user._id
        })

        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            blog.likes = body.likes
            const savedBlog = await blog.save()
            response.json(savedBlog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exeption) {
        next(exeption)
    }

})

module.exports = blogRouter
