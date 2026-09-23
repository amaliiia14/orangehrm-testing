class loginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  enterUsername(username) {
    cy.get('input[placeholder="Username"]').type(username)
  }

  enterPassword(password) {
    cy.get('input[placeholder="Password"]').type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  assertionLogin() {
    cy.url().should('include','/dashboard')
  }

  errorMessage() {
    return cy.get('div[role="alert"]').should('contain','Invalid credentials')
  }

  requiredMessage() {
    return cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  }
}

export default new loginPage()