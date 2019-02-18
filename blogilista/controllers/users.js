const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const saltRounds = 10

        if (!body.password) {
            return response.status(400).json({ error: 'salasana puuttuu' })
        } else if (body.password.length < 3) {
            return response.status(400).json({ error: 'liian lyhyt salasana' })
        }

        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)

    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter