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

  // NB I changed this test to fire only once, the way this is handled in
  // the app is the button is 'disabled' after a user likes a particular blog
  // to discoourage vote spamming
  test('<BlogDetails /> if like button is clicked, associated event handler is called', () => {
    const mockHandler = jest.fn()
    const component = render(
      <BlogDetails blog={blog} user={user} handleLikes={mockHandler} />,
    )

    const div = component.container.querySelector('.fullDetails')
    console.log(prettyDOM(div))
    const button = component.getByText('like')
    fireEvent.click(button)
    // fireEvent.click(button)
    // expect(mockHandler.mock.calls).toHaveLength(2)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
