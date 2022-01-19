import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import BlogDetails from './BlogDetails'

describe('<BlogDetails />', () => {
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

  // Change this test to fire once if disabling button after click in BlogDetails state
  test('<BlogDetails /> if like button is clicked, associated event handler is called', () => {
    const mockHandler = jest.fn()
    const component = render(
      <BlogDetails blog={blog} user={user} handleLikes={mockHandler} />,
    )

    const div = component.container.querySelector('.fullDetails')
    console.log(prettyDOM(div))
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
