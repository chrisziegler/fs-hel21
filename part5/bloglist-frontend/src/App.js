import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import * as blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newblog, setNewblog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBloglistAppUser',
    )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      if (user) {
        window.localStorage.setItem(
          'loggedBloglistAppUser',
          JSON.stringify(user),
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } else {
        setPassword('')
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBlogSubmit = async event => {
    try {
      event.preventDefault()
      const newBlog = await blogService.create(newblog)
      setBlogs(blogs.concat(newBlog))
      setNewblog({ title: '', author: '', url: '' })
      setSuccessMessage(
        `a new blog ${newBlog.title} ${newBlog.error} added`,
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(
        `${error.toString()}, title, author url required with minimum length of 5 characters each`,
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h3>blogs login</h3>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <div className="form">
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="form">
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="button login" type="submit">
        submit
      </button>
    </form>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const blogForm = () => (
    <form onSubmit={handleBlogSubmit}>
      <h3>post new</h3>
      <div className="form">
        title
        <input
          type="text"
          name="Title"
          value={newblog.title}
          onChange={({ target }) =>
            setNewblog({ ...newblog, title: target.value })
          }
        />
      </div>
      <div className="form">
        author
        <input
          type="text"
          name="Author"
          value={newblog.author}
          onChange={({ target }) =>
            setNewblog({ ...newblog, author: target.value })
          }
        />
      </div>
      <div className="form">
        url
        <input
          type="text"
          name="URL"
          value={newblog.url}
          onChange={({ target }) =>
            setNewblog({ ...newblog, url: target.value })
          }
        />
      </div>
      <button className="button" type="submit">
        submit
      </button>
    </form>
  )

  const blogList = () => (
    <div>
      <h1>blogs</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <p className="smtext">
        <em>{user.name}</em> is logged in{' '}
        <button className="logout" onClick={() => logout()}>
          logout
        </button>
      </p>
      <div className="list">
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      {blogForm()}
    </div>
  )

  return <div>{!user ? loginForm() : blogList()}</div>
  // return (
  //   <>
  //     <div>{loginForm()}</div>
  //     {user && <div>User {user.username} is logged in</div>}
  //     <div>{blogList()}</div>
  //     <div>{blogForm()}</div>
  //   </>
  // )
}

export default App
