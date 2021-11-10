describe('Blog app', function () {
  beforeEach(function () {
    // delete all users and blogs from testing DB
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
    cy.visit('http://localhost:3000')
    cy.contains('blogs login')
  })
  describe('Login', function () {
    it('Succeeds with the right credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('admin')
      cy.get('#password').type('hunter2')
      cy.get('#login').click()
      cy.contains('Administrator Z is logged in')
    })
    it('Fails with bad credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Administrator Z logged in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'hunter2' })
      // usually prevents race condition where Cypress clicks the toggle button before the onClick event is there
      cy.wait(150)
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title-input').type('JavaScript: The Good Parts')
      cy.get('#author-input').type('Douglas Crockford')
      cy.get('#url-input').type('https://www.crockford.com/books.html')
      cy.get('#submit-blog').click()
      cy.get('.success').should('contain', 'JavaScript: The Good Parts')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      // added to the list of all blogs
      cy.contains('JavaScript: The Good Parts | Douglas Crockford')
    })
    describe('Blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'In Cold Blood',
          author: 'Truman Capote',
          url: 'http;//www.w3.org',
          likes: 0,
        })
      })
      it('Can be liked by users', function () {
        cy.contains('In Cold Blood | Truman Capote')
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.get('#like').click()
        cy.contains('likes: 1')
      })
      it('Can be deleted by user who created it', function () {
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.on('window:confirm', () => true)
        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'In Cold Blood')
      })
      it('Cannot be deleted by other users', function () {
        cy.contains('logout').click()
        const user = {
          name: 'New User',
          username: 'newuser',
          password: 'hunter2',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login({ username: 'newuser', password: 'hunter2' })
        cy.contains('In Cold Blood').get('.view').click()
        // cy.contains('delete')
        cy.get('[data-cy-fulldetail]').should('not.contain', 'delete')
      })
      it('Orders Blogs in descending likes', function () {
        cy.contains('Administrator Z is logged in')
        cy.createBlog({
          title: 'A Prayer for Owen Meany',
          author: 'John Irving',
          url: 'http;//www.john-irving.com',
          likes: 100,
        })
        cy.createBlog({
          title: 'Hyperion',
          author: 'Dan Simmons',
          url: 'https://en.wikipedia.org/wiki/Dan_Simmons',
          likes: 50,
        })
        cy.contains('view').click()
        cy.contains('view').click()
        cy.contains('view').click()

        cy.get('[data-cy=likes]').then(items =>
          items.map((i, item) => {
            if (i === 0) {
              expect(item.innerText).to.contain('likes: 100')
            }
            if (i === 1) {
              expect(item.innerText).to.contain('likes: 50')
            }
            if (i === 2) {
              expect(item.innerText).to.contain('likes: 0')
            }
          }),
        )

        // items.map((i, span) => {
        //   blogsList.concat(span.innerText)
        // }),

        // console.log(blogsList[0])
      })
    })
  })
})
