import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newblog, setNewblog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = event => {
    event.preventDefault()
    createBlog(newblog)
    setNewblog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <h3 className="blogform">post new</h3>
      <div className="form">
        title
        <input
          id="title"
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
          id="author"
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
          id="url"
          type="text"
          name="URL"
          value={newblog.url}
          onChange={({ target }) =>
            setNewblog({ ...newblog, url: target.value })
          }
        />
      </div>
      <button className="submit" type="submit">
        submit
      </button>
    </form>
  )
}

export default BlogForm
