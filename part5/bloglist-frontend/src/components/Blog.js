import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} <span style={{ color: 'white' }}>|</span> {blog.author}
  </div>
)

export default Blog
