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

blogRouter.post('/', async (request, response, next) => {
    const blog = request.body

    console.log('token', request.token)

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        console.log('user', user)

        if (!user) {
            return response.status(400).json({ error: 'user not found' })
        }

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
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const { author, title, url, likes } = request.body

    const blog = {
        author, title, url, likes,
      }
    
      const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
          
      response.json(updatedBlog.toJSON())
    })
    

//     try {
//         const blog = await Blog.findById(request.params.id)
//         if (blog) {
//             blog.likes = likes
//             const savedBlog = await blog.save()
//             response.json(savedBlog.toJSON())
//         } else {
//             response.status(404).end()
//         }
//     } catch (exeption) {
//         next(exeption)
//     }
// })


module.exports = blogRouter
