import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleNotification = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification('wrong username or password', true)
    }
  }

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      handleNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`, false)
    } catch (exception) {
      handleNotification('all fields are mandatory', true)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
      handleNotification(`blog "${blog.title}" was updated`, false)
    } catch (exception) {
      handleNotification(`error updating blog "${blog.title}"`, true)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      handleNotification(`blog "${blog.title}" was deleted`, false)
    } catch (exception) {
      handleNotification(`error deleting blog "${blog.title}"`, true)
    }
  }

  return (
    <div>
      <Notification message={message} isError={isError} />
      {user === null ?
        <div>
          <h2>Log in to the application</h2>
          <Togglable buttonLabel='log in' ref={loginFormRef}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div> : <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} user={user} updateBlogFn={updateBlog} removeBlogFn={removeBlog} />
            )}
        </div>
      }
    </div>
  )
}

export default App
