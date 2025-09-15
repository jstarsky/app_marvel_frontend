describe('Login flow', () => {
  it('logs in with marvelus7 credentials and searches for sder after wait', () => {
    // Intercept the real backend POST and allow it to proceed (passthrough)
    cy.intercept('POST', 'https://appmarvelbackend-production.up.railway.app/auth/login/').as('realLogin')

    // Intercept characters search API so we can wait for search results
    cy.intercept('GET', '/api/marvel/characters*').as('charactersSearch')

    cy.visit('/auth/login')

    cy.get('[data-testid=login-username]').clear().type('marvelus7')
    cy.get('[data-testid=login-password]').clear().type('marvelus7')

    cy.get('[data-testid=login-submit]').click()

    // Assert the intercepted request returned 200
    cy.wait('@realLogin', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    cy.log('Real backend returned 200 for /auth/login/')

    // Then assert navigation to /characters
    cy.location('pathname', { timeout: 10000 }).should('include', '/characters')

    // Wait for search input to become available, type 'sder' and press Enter
    cy.get('[data-testid=search-input]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type('sder{enter}')

    // Wait for the characters search API to return (allow longer timeout)
    cy.wait('@charactersSearch', { timeout: 30000 }).its('response.statusCode').should('eq', 200)

    // Check that at least one character card is present
    cy.get('[id^=card-]', { timeout: 10000 }).should('exist')

    // Now type 'spider' and press Enter to refine search
    cy.get('[data-testid=search-input]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type('spider{enter}')

    // Wait for the characters search API for the spider query
    cy.wait('@charactersSearch', { timeout: 30000 }).its('response.statusCode').should('eq', 200)

    // Assert cards exist for the spider search
    cy.get('[id^=card-]', { timeout: 10000 }).should('exist')
  })
})
