import React, { useState } from 'react'
import * as blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, setSuccessMessage }) => {
  const [showFull, setShowFull] = useState(false)

  const summary = () => {
    return (
      <div>
        {blog.title}
        <span style={{ color: 'white' }}> | </span>
        {blog.author}{' '}
        <button onClick={toggleShow} className="view">
          view
        </button>
      </div>
    )
  }

  const fullDetails = () => {
    const detailStyle = {
      paddingLeft: '0.2em',
    }

    const handleLike = async (e, blogObj) => {
      const updatedBlog = await blogService.update(blogObj)
      if (updatedBlog) {
        const returnedBlogs = await blogService.getAll()
        setBlogs(returnedBlogs)
        e.target.classList.toggle('liked')
        e.target.innerText = 'liked'
      } else {
        console.log("something went wrong with adding a 'like'")
        return
      }
    }

    const handleDelete = async blog => {
      const { id, title } = blog
      const removedBlog = await blogService.remove(id)
      if (removedBlog === 204) {
        const returnedBlogs = await blogService.getAll()
        setBlogs(returnedBlogs)
        setSuccessMessage(`${title} removed`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } else {
        return
      }
    }

    return (
      <div>
        <ul style={detailStyle}>
          <hr />
          <li>
            <span>
              <i>{blog.title}</i>
            </span>{' '}
            <button onClick={toggleShow} className="hide">
              hide
            </button>
          </li>
          <li
            style={{
              textDecoration: 'underline solid rgba(0, 0, 0, 0.4)',
            }}
          >
            {blog.url}
          </li>
          <li>
            likes:&nbsp; {blog.likes}{' '}
            <button
              className="like"
              onClick={event => handleLike(event, blog)}
            >
              like
            </button>
          </li>
          <li>author:&nbsp;{blog.author}</li>
          {console.log(user.username, blog.user.username)}
          {user.username === blog.user.username && (
            <button className="delete" onClick={() => handleDelete(blog)}>
              delete
            </button>
          )}
          <hr />
        </ul>
      </div>
    )
  }
  const toggleShow = () => {
    setShowFull(!showFull)
  }

  return <>{!showFull ? summary() : fullDetails()}</>
}

export default Blog
