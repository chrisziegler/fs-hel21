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
      background: 'rgb(230, 227, 216)',
    }
    const liStyle = {
      paddingLeft: '0.3em',
    }

    const handleLike = async (e, blogObj) => {
      const updatedBlog = await blogService.update(blogObj)
      if (updatedBlog) {
        // const returnedBlogs = await blogService.getAll()
        // setBlogs(returnedBlogs)
        // unlike with the post route adding a like shouldn't require the populate data from the a separate call to the GET route
        // first remove updated blog
        const unupdatedRemoved = blogs.filter(
          blog => blog.id !== updatedBlog.id,
        )
        setBlogs(unupdatedRemoved.concat(updatedBlog))
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
          <li style={liStyle}>
            <span>
              <i>{blog.title}</i>
            </span>{' '}
            <button onClick={toggleShow} className="hide">
              hide
            </button>
          </li>
          <li style={liStyle}>
            <a href={blog.url}>{blog.url}</a>
          </li>
          <li style={liStyle}>
            likes:&nbsp; {blog.likes}{' '}
            <button
              className="like"
              onClick={event => handleLike(event, blog)}
            >
              like
            </button>
          </li>
          <li style={liStyle}>author:&nbsp;{blog.author}</li>
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
