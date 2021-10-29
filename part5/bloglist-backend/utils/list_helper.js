/* eslint-disable no-unused-vars */

const dummy = blogs => {
  return blogs.length === 0 ? 1 : 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  const numLikes = blogs.reduce((arr, blog) => {
    arr.push(blog.likes)
    return arr
  }, [])
  let maxLikes = Math.max(...numLikes)
  return blogs
    .filter(blog => blog.likes === maxLikes)
    .map(({ _id, url, __v, ...rest }) => rest)
}

const mostBlogs = arr => {
  // ['Michael Chan','Edsger W. Dijkstra','Edsger W. Dijkstra',...]
  const blogsPerAuthor = arr
    .map(({ author }) => author)
    // { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
    .reduce((acc, value) => ({ ...acc, [value]: acc[value] + 1 || 1 }), {})
  // 'Robert C. Martin'
  const maxKey = Object.keys(blogsPerAuthor).reduce((prev, next) =>
    blogsPerAuthor[prev] > blogsPerAuthor[next] ? prev : next,
  )
  // { author: 'Robert C. Martin', blogs: 3, }
  return {
    author: maxKey,
    blogs: blogsPerAuthor[maxKey],
  }
}

const mostLikes = arr => {
  // { 'Michael Chan': 7, 'Edsger W. Dijkstra': 17, 'Robert C. Martin': 12 }
  const likesPerAuthor = arr.reduce((latestAuthor, { author, likes }) => {
    const isNewEntry = !(author in latestAuthor)
    if (isNewEntry) {
      latestAuthor[author] = likes
    } else {
      latestAuthor[author] += likes
    }
    return latestAuthor
  }, {})
  // [ 'Michael Chan', 'Edsger W. Dijkstra', 'Robert C. Martin' ] -> 'Edsger W. Dijkstra'
  const maxKey = Object.keys(likesPerAuthor).reduce((prev, next) => {
    return likesPerAuthor[prev] > likesPerAuthor[next] ? prev : next
  })
  return {
    author: maxKey,
    likes: likesPerAuthor[maxKey],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
