import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlogFn, removeBlogFn }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'dodgerblue',
  }

  const handleAddLike = () => {
    updateBlogFn({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeBlogFn(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button className='like-button' onClick={handleAddLike}>like</button></div>
          {blog.user && blog.user.username === user.username && (
            <button className='removeButton' style={removeButtonStyle} onClick={handleRemoveBlog}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlogFn: PropTypes.func.isRequired,
  removeBlogFn: PropTypes.func.isRequired
}

export default Blog