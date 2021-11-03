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

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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
      // setBlogs(blogs.concat(returnedBlog))
      // Updating state here as above would be preferable, but:
      // Need this extra db call since the response.data in the put route doesn't populate the user field with an
      // object containing id, and username, only the get route does that.
      // so this adds a blog object without those files and we can't compare user.username to blog.user.username
      // until we rerender after that updated state change - just annoying non-relational db stuff
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs)
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
    <div>
      <h1>
        bl<span style={{ color: 'thistle' }}>o</span>gs
      </h1>
      <form onSubmit={handleLogin}>
        <h3 style={{ marginTop: '2em' }}>blogs login</h3>
        <Notification
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <div className="form">
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form">
          password
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
    </div>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable
      buttonLabel="new blog"
      cancelButtonLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm
        createBlog={addBlog}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h1>
        bl<span style={{ color: 'thistle' }}>o</span>gs
      </h1>
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
      {blogForm()}
      <div className="list">
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setSuccessMessage={setSuccessMessage}
          />
        ))}
      </div>
    </div>
  )

  return <div>{!user ? loginForm() : blogList()}</div>
}

export default App
