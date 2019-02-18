const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')

beforeEach(async () => {
    await Blog.remove({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
describe('blogs testing', () => {

    test('right amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs are json ', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id is right way', async () => {
        const beginning = await helper.blogsInDb()

        expect(beginning[0].id).toBeDefined()
    })

    test('blog added', async () => {
        const beginning = await helper.blogsInDb()
        const newBlog = {
            title: 'Mielenkiintoinen blogi',
            author: 'Minä',
            url: 'www.blogi.fi',
            likes: 10
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const lopuksi = await helper.blogsInDb()
        const titles = lopuksi.map(t => t.title)
        expect(lopuksi.length).toBe(beginning.length + 1)
    })

    test('if no like it is 0', async () => {
        const beginning = await helper.blogsInDb()
        const newBlog = {
            title: 'Pitää taas keksiä joku',
            author: 'No Minä Edelleen',
            url: 'www.blogi.fi'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const lopuksi = await helper.blogsInDb()
        const likes = lopuksi.map(l => l.likes)
        expect(likes).toEqual([7, 5, 0])
    })

    test('blog have title', async () => {
        const beginning = await helper.blogsInDb()
        const newBlog = {
            author: 'No Minä Edelleen',
            url: 'www.blogi.fi',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const lopuksi = await helper.blogsInDb()
        expect(lopuksi.length).toBe(beginning.length)
    })

    test('all blogs have url', async () => {
        const beginning = await helper.blogsInDb()
        const newBlog = {
            title: 'Tärkeä blogi',
            author: 'Maria',
            likes: 2
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        const lopuksi = await helper.blogsInDb()
        expect(lopuksi.length).toBe(beginning.length)
    })

    test('blog deleted', async () => {
        const beginning = await helper.blogsInDb()
        const poista = beginning[0]
        await api
            .delete(`/api/blogs/${poista.id}`)
            .expect(204)

        const lopuksi = await helper.blogsInDb()
        expect(lopuksi.length).toBe(beginning.length - 1)
    })

    test('edit likes', async () => {
        const beginning = await helper.blogsInDb()
        const editedBlogId = beginning[0].id
        const newLikes = { likes: 100 }

        await api
            .put(`/api/blogs/${editedBlogId}`)
            .send(newLikes)
            .expect(200)
        const lopuksi = await helper.blogsInDb()
        const likes = lopuksi.map(l => l.likes)
        expect(likes).toEqual([100, 5])
    })
})

afterAll(() => {
    mongoose.connection.close()
})