const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostFav, current) => (mostFav.likes > current.likes ? mostFav : current)

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = _.countBy(blogs, 'author')
  const authorWithMostBlogs = Object.keys(authors).reduce((a, b) => (authors[a] > authors[b] ? a : b))

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authors = _.groupBy(blogs, 'author')
  const authorWithMostLikes = _.map(authors, (blogs, author) => ({ author: author, likes: totalLikes(blogs) }))

  return favoriteBlog(authorWithMostLikes)
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}