import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('the form calls the event handler', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await user.type(title, 'Yard duty')
    await user.type(author, 'Harper Grace')
    await user.type(url, 'https://hg.com/3c9vvf0')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Yard duty')
    expect(createBlog.mock.calls[0][0].author).toBe('Harper Grace')
    expect(createBlog.mock.calls[0][0].url).toBe('https://hg.com/3c9vvf0')
  })
})