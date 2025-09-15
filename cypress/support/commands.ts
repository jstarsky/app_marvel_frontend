export {}

// cypress/support/commands.ts
// Add custom commands here if needed

declare global {
  namespace Cypress {
    interface Chainable {
      login(): void
    }
  }
}

Cypress.Commands.add('login', () => {
  // placeholder: implement backend-authenticated login if required
  cy.log('login placeholder')
})
