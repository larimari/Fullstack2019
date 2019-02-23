import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newMessage, setMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Kirjautuminen onnistui')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog'>
      <BlogForm
        newAuthor={newAuthor}
        newTitle={newTitle}
        newUrl={newUrl}
        addBlog={addBlog}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
      />
    </Togglable>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setMessage('Blogin lisääminen onnistui')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }

    blogService
      .update(blogObject)
      .then(allBlogs => {
        setBlogs(blogs.map(b => b.id === blog.id ? allBlogs : b))
      })

    setMessage(`Blogiin "${blogObject.title}" on lisätty tykkäys`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const sortBlogs = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return blogs
  }

  const deleteBlog = (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog.id
    }

    blogService
      .remove(blogObject)
      .then(
        setBlogs(blogs.filter((allBlogs => allBlogs.id !== blog.id))
        )
      )

    setMessage(`Blogi "${blogObject.title}" on poistettu`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const Notification = () => {
    if (newMessage === null) {
      return null
    } else {
      return (
        <div>
          {newMessage}
        </div>
      )
    }
  }


  return (
    <div>

      <Notification message={newMessage} />

      <h2>Kirjaudu</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => logout()}>logout</button>
          {blogForm()}
          <h2>Blogs</h2>
          {sortBlogs(blogs).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} user={user} deleteBlog={deleteBlog} />)}
        </div>
      }

    </div>
  )

}

export default App