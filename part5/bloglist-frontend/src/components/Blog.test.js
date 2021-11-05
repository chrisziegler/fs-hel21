import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog, user
  beforeEach(() => {
    blog = {
      title: 'Testing React components is clunky AF',
      author: 'Martha Stewart',
      url: 'http://www.marthacooks.com',
      likes: 100,
      user: {
        username: 'admin',
      },
    }
    user = {
      username: 'admin',
    }
  })

  test('<Blog /> renders only title and author by default', () => {
    const component = render(<Blog blog={blog} />)
    const div = component.container.querySelector('div')

    expect(div).toBeDefined()
    expect(div).toHaveTextContent('Testing React components is clunky AF')
    expect(div).toHaveTextContent('Martha Stewart')
    expect(div).not.toHaveTextContent('http://www.marthacooks.com')
    expect(component.container).not.toHaveTextContent('100')
  })

  test('<Blog /> show details button renders url and likes when clicked', () => {
    const component = render(<Blog blog={blog} user={user} />)
    const button = component.container.querySelector('.view')
    fireEvent.click(button)
    const div = component.container.querySelector('.fullDetails')
    expect(div).toHaveTextContent('http://www.marthacooks.com')
    expect(div).toHaveTextContent('likes: 100')
    // console.log(prettyDOM(div))
  })
})
