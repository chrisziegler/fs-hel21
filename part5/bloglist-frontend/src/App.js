import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const handleBlogSubmit = async event => {
    try {
      event.preventDefault()
      const newBlog = await blogService.create(newblog)
      setBlogs(blogs.concat(newBlog))
      setNewblog({ title: '', author: '', url: '' })
    } catch (error) {
      console.log(error.message)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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
      <button className="button login" type="submit">
        submit
      </button>
    </form>
  )

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
      <p className="smtext">
        <em>{user.name}</em> is logged in
      </p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
      {blogForm()}
    </div>
  )

  return <div>{!user ? loginForm() : blogList()}</div>
}

export default App
