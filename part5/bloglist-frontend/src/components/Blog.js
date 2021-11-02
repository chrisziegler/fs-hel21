import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

    return (
      <div>
        <ul style={detailStyle}>
          <hr />
          <li>
            <span>
              <i>title:</i> &nbsp;{blog.title}
            </span>{' '}
            <button onClick={toggleShow} className="hide">
              hide
            </button>
          </li>
          <li>
            <i>url:&nbsp;</i> {blog.url}
          </li>
          <li>
            <i>likes:&nbsp;</i> {blog.likes}{' '}
            <button className="like">like</button>
          </li>
          <li>
            <i>author:&nbsp;</i> {blog.author}
          </li>
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
