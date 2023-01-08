describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Harper Grace',
      username: 'hgrace',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Log in to the application')
    cy.contains('log in')
  })

  describe('log in', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('hgrace')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Harper Grace logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('hgrace')
      cy.get('#password').type('abcxyz')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Harper Grace logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hgrace', password: 'salainen' })
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      })
      cy.createBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 93,
      })
      cy.createBlog({
        title: 'Morning trail',
        author: 'Harper Grace',
        url: 'https://hg.com/ca495fg',
        likes: 46,
      })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Yard duty')
      cy.get('#author').type('Harper Grace')
      cy.get('#url').type('https://hg.com/3c9vvf0')
      cy.get('#create-button').click()

      cy.get('.notification')
        .should('contain', 'a new blog "Yard duty" by Harper Grace added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Yard duty')
    })

    it('users can like a blog', function () {
      cy.contains('React patterns').parent().as('firstBlog')
      cy.get('@firstBlog').contains('view').click()
      cy.get('@firstBlog').contains('like').click()
      cy.get('@firstBlog').contains('likes 1')
    })

    it('user who created a blog can delete it', function () {
      cy.contains('Morning trail').parent().as('thirdBlog')
      cy.get('@thirdBlog').contains('view').click()
      cy.get('@thirdBlog').contains('remove').click()
      cy.get('.blog').should('not.contain', 'Morning trail')
    })

    it('blogs are ordered according to likes', function () {
      cy.get('.blog').eq(0).should('contain', 'First class tests')
      cy.get('.blog').eq(1).should('contain', 'Morning trail')
      cy.get('.blog').eq(2).should('contain', 'React patterns')
    })
  })
})