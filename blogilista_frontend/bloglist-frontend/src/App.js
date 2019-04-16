import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Table, Button } from 'semantic-ui-react'

const BlogList = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog">
      <BlogForm author={author} title={title} url={url} addBlog={addBlog} />
    </Togglable>
  )
  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }
    blogService.create(blogObject).then(returnedBlog => {
      props.setBlogs(props.blogs.concat(returnedBlog))
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
      props.setBlogs(props.blogs.map(b => (b.id === blog.id ? allBlogs : b)))
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
      .then(
        props.setBlogs(props.blogs.filter(allBlogs => allBlogs.id !== blog.id))
      )

    props.setNotification(`Blogi "${blogObject.title}" on poistettu`, 5)
  }
  return (
    <div>
      <h2>Blogs</h2>
      {blogForm()}
      <div>
        <p />
      </div>
      {sortBlogs(props.blogs).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          user={props.user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

const App = props => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
    userService.getAll().then(users => setUsers(users))
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

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <Container>
      <Notification />

      <h2>Kirjaudu</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <Button onClick={() => logout()}>logout</Button>
          {users.length > 0 && <Users users={users} />}

          <Menu blogs={blogs} users={users} user={user} setBlogs={setBlogs} setNotification={setNotification}/>
        </div>
      )}
    </Container>
  )
}

const Users = props => {
  console.log(props.users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Link to="/">Kaikki blogit</Link>
            </Table.Cell>
            <Table.Cell>
              <b>Blogs</b>
            </Table.Cell>
          </Table.Row>
          {props.users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
          {/* <td>{props.users.reduce((acc,user) => acc + user.blogs.length, 0)}</td> */}
        </Table.Body>
      </Table>
    </div>
  )
}

const UserView = props => {
  console.log('props in blogs', props)
  if (!props.users.length) {
    return null
  }

  // käyttäjää ei löydy
  if (!props.users.find(({ id }) => id === props.id)) {
    return <h1>VIRHE!!! RIKOS!! Käyttäjää ei löytynyt</h1>
  }

  return (
    <div>
      <h2>{props.users.find(({ id }) => id === props.id).name}'s</h2>
      <h3>Added blogs</h3>
      <ul>
        {props.blogs
          .filter(b => b.user.id === props.id)
          .map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

const Menu = props => {
  return (
    <div>
      <Route exact path="/" render={() => <BlogList {...props} />} />
      <Route
        exact
        path="/users/:id"
        render={({ match }) => (
          <UserView
            blogs={props.blogs}
            users={props.users}
            id={match.params.id}
          />
        )}
      />
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

const Wrapper = props => {
  return (
    <div>
      <Router>
        <App {...props} />
      </Router>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Wrapper)