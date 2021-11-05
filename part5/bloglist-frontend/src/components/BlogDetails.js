const BlogDetails = ({
  blog,
  toggleShow,
  handleLike,
  user,
  handleDelete,
}) => {
  const detailStyle = {
    background: 'rgb(230, 227, 216)',
  }
  const liStyle = {
    paddingLeft: '0.3em',
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
          likes:&nbsp; {blog.likes}{' '}
          <button className="like" onClick={() => handleLike(blog)}>
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
