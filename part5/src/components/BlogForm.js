import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
  }

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input name='title' value={newBlog.title} onChange={handleBlogChange} id='title' />
        </div>
        <div>
          author: <input name='author' value={newBlog.author} onChange={handleBlogChange} id='author' />
        </div>
        <div>
          url: <input name='url' value={newBlog.url} onChange={handleBlogChange} id='url' />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm