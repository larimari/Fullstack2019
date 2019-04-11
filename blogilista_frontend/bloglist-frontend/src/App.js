import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import { useField } from './hooks'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import {
  setNotification,
  clearNotification
} from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      password.props.reset()
      username.props.reset()

      props.setNotification('Kirjautuminen onnistui', 5)

    } catch (exception) {
      props.setNotification('Käyttäjätunnus tai salasana virheellinen', 5)
    }
  }
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog">
      <BlogForm author={author} title={title} url={url} addBlog={addBlog} />
    </Togglable>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      author.props.reset()
      title.props.reset()
      url.props.reset()
    })
    props.setNotification('Blogin lisääminen onnistui', 5)
  }

  const addLike = blog => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }

    blogService.update(blogObject).then(allBlogs => {
      setBlogs(blogs.map(b => (b.id === blog.id ? allBlogs : b)))
    })

    props.setNotification(`Blogiin "${blogObject.title}" on lisätty tykkäys`, 5)

  }
  const sortBlogs = blogs => {
    blogs.sort(function(a, b) {
      return b.likes - a.likes
    })
    return blogs
  }

  const deleteBlog = blog => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog.id
    }

    blogService
      .remove(blogObject)
      .then(setBlogs(blogs.filter(allBlogs => allBlogs.id !== blog.id)))

    props.setNotification(`Blogi "${blogObject.title}" on poistettu`, 5)
  }

  return (
    <div>
      <Notification />

      <h2>Kirjaudu</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => logout()}>logout</button>
          {blogForm()}
          <h2>Blogs</h2>
          {sortBlogs(blogs).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              user={user}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(null, mapDispatchToProps)(App)
