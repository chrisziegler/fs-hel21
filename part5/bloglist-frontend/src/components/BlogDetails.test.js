import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import BlogDetails from './BlogDetails'

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

  test.only('<BlogDetails /> if like button is clicked twice, associated event handler is called twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <BlogDetails blog={blog} user={user} handleLike={mockHandler} />,
    )

    // fireEvent.click(detailsButton)
    const div = component.container.querySelector('.fullDetails')
    // const likeButton = component.getByText('like')
    console.log(prettyDOM(div))
    // fireEvent.click(likeButton)
    // expect(mockHandler.mock.calls).toHaveLength(1)
    // fireEvent.click(likeButton)
    // expect(likeBlog.mock.calls).toHaveLength(1)
  })
})
