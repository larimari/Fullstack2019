import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

// afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Komponenttitestaus',
    author: 'Testi',
    likes: 9
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus'
  )

  expect(component.container).toHaveTextContent(
    'Testi'
  )

  expect(component.container).toHaveTextContent(
    'blog has 9 likes'
  )

})

it('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Komponenttitestaus',
    author: 'Testi',
    likes: 9
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
