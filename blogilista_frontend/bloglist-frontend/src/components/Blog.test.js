import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

const user = {
  username: 'kukka',
  name: 'Kukka Kukkinen'
}

const blog = {
  title: 'Komponenttitestaus',
  author: 'Testi',
  url: 'www.blog.fi',
  likes: 9,
  user: user
}



test('renders content', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )
  expect(component.container).toHaveTextContent(
    'Komponenttitestaus'
  )
  expect(component.container).toHaveTextContent(
    'Testi'
  )
})

it('clicking the button show the rest', async () => {

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const text = component.getByText('Komponenttitestaus')
  fireEvent.click(text)

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus'
  )
  expect(component.container).toHaveTextContent(
    'Testi'
  )
  expect(component.container).toHaveTextContent(
    'www.blog.fi'
  )
  expect(component.container).toHaveTextContent(
    '9 likes'
  )

})
