import { useState } from 'react'

const BlogDetails = ({
  blog,
  toggleShow,
  handleLikes,
  user,
  handleDelete,
}) => {
  const [likes, setLikes] = useState(blog.likes)
  const [disable, setDisable] = useState(false)

  const detailStyle = {
    background: 'rgb(230, 227, 216)',
  }
  const liStyle = {
    paddingLeft: '0.3em',
  }

  const handleBlogLikes = (event, blog) => {
    let renderedLikes = likes
    setLikes((renderedLikes += 1))
    setDisable(true)
    event.target.classList.toggle('liked')
    event.target.innerText = 'liked'
    handleLikes(blog)
  }

  return (
    <div className="fullDetails">
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
          likes:&nbsp; {likes}{' '}
          <button
            className="like"
            disabled={disable}
            onClick={event => handleBlogLikes(event, blog)}
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

export default BlogDetails
