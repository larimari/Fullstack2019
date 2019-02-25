import React from 'react'
import { render,  waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('user can only log in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
})