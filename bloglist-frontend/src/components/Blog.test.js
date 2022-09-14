import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test',
    url: "test.com"
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

