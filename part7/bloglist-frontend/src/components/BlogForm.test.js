import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> onSubmit calls the addForm handler from props with right details', () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog} />)

    const form = component.container.querySelector('form')
    // console.log(prettyDOM(form))
    const titleInput = component.container.querySelector('#title')
    console.log(prettyDOM(titleInput))
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    fireEvent.change(titleInput, {
      target: { value: 'Testing React components is clunky AF' },
    })
    fireEvent.change(authorInput, {
      target: { value: 'Martha Stewart' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'http://www.marthacooks.com' },
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(
      'Testing React components is clunky AF',
    )
    expect(createBlog.mock.calls[0][0].author).toBe('Martha Stewart')
    expect(createBlog.mock.calls[0][0].url).toBe(
      'http://www.marthacooks.com',
    )

    // expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
