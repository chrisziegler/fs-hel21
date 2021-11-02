import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import * as blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // const [showBlogForm, setShowBlogForm] = useState(false)

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

  const blogFormRef = useRef()

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

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    if (returnedBlog) {
      setBlogs(blogs.concat(returnedBlog))
    } else {
      setErrorMessage(
        ` title, author url required with minimum length of 5 characters each`,
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
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </Togglable>
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
}

export default App
