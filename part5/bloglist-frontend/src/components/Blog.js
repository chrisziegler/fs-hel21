import React, { useState } from 'react'
import * as blogService from '../services/blogs'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, setBlogs, blogs, user, setSuccessMessage }) => {
  const [showFull, setShowFull] = useState(false)

  const blogSummary = () => {
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

  const handleLike = async blogObj => {
    const updatedBlog = await blogService.update(blogObj)
    if (updatedBlog) {
      // const returnedBlogs = await blogService.getAll()
      // setBlogs(returnedBlogs)

      // unlike with the post route adding a like shouldn't require the populate data from the a separate call to the GET route
      // first remove updated blog
      const removeUpdated = blogs.filter(
        blog => blog.id !== updatedBlog.id,
      )
      setBlogs(removeUpdated.concat(updatedBlog))
      // e.target.classList.toggle('liked')
      // e.target.innerText = 'liked'
    } else {
      console.log("something went wrong with adding a 'like'")
      return
    }
  }

  const handleDelete = async blog => {
    if (!window.confirm(`Do you really want to delete ${blog.title}?`)) {
      return
    }
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

  const toggleShow = () => {
    setShowFull(!showFull)
  }

  return (
    <>
      {!showFull ? (
        blogSummary()
      ) : (
        <BlogDetails
          blog={blog}
          toggleShow={toggleShow}
          handleLike={handleLike}
          user={user}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Blog
