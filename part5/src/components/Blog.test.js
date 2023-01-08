import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Yard duty',
    author: 'Harper Grace',
    url: 'https://hg.com/3c9vvf0',
    likes: 90,
    user: {
      username: 'hgrace',
      name: 'Harper Grace',
      id: '63a06e74052ecd3b5ca66cdc',
    },
  }

  const user = {
    username: 'hgrace',
    name: 'Harper Grace',
    id: '63a06e74052ecd3b5ca66cdc',
  }
  const mockUpdateFn = jest.fn()
  const mockRemoveFn = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} updateBlogFn={mockUpdateFn} removeBlogFn={mockRemoveFn} />
    ).container
  })

  test('title and author are rendered by default', () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
  })

  test('URL and number of likes are shown when the "view" button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

  test('event handler is called twice if the "like" button is clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateFn.mock.calls).toHaveLength(2)
  })
})