describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Administrator Z',
      username: 'admin',
      password: 'hunter2',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs login')
  })
  describe('Login', function () {
    it('succeeds with the right credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('hunter2')
      cy.get('#login').click()
      cy.contains('Administrator Z is logged in')
    })
    it('Fails with bad credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Administrator Z logged in')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'hunter2' })
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title-input').type(
        'Cypress is buggy with this Togglable component. Here is a hack',
      )
      cy.contains('new blog').click()
      cy.get('#title-input').type('JavaScript: The Good Parts')
      cy.get('.form-author').find('input').type('Douglas Crockford')
      cy.get('#url-input').type('https://www.crockford.com/books.html')
      cy.get('#submit-blog').click()
      cy.get('.success').should('contain', 'JavaScript: The Good Parts')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('JavaScript: The Good Parts | Douglas Crockford')
    })
  })
})
