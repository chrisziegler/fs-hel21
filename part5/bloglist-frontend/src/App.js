import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      window.localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify(user),
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h2>Blogs login</h2>
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
      <button type="submit">submit</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return <div>{!user ? loginForm() : blogList()}</div>
}

export default App
