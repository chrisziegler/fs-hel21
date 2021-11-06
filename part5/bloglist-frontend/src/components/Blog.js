import { useState } from 'react'
import * as blogService from '../services/blogs'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, setBlogs, user, setSuccessMessage }) => {
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

  const handleLikes = async blogObj => {
    const updatedBlog = await blogService.update(blogObj)
    if (updatedBlog) {
      return
      // decided not to update state while updating likes
      // mock the behavior in BlogDetails state and update on server
      // to prevent re-render and losing showFull state for detailed blog

      // const removeUpdated = blogs.filter(
      //   blog => blog.id !== updatedBlog.id,
      // )
      // setBlogs(removeUpdated.concat(updatedBlog))
    } else {
      console.log('something went wrong with adding a "like"')
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
          handleLikes={handleLikes}
          user={user}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Blog
