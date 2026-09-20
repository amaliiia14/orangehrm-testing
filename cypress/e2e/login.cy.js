describe ('Verifikasi proses login pada website OrangeHRM', () => {
  it('TC_001 - Login dengan username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include','/dashboard')
  })

  it('TC_002 - Login dengan username dan password yang belum terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin2')
    cy.get('input[placeholder="Password"]').type('admin222')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_003 - Login dengan username menggunakan huruf kecil dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_004 - Login dengan username valid dan password menggunakan huruf besar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_005 - Login dengan invalid username dan valid password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin123')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_006 - Login dengan valid username dan invalid password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('Admin123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_007 - Login tanpa menginputkan username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  })

  it('TC_008 - Login tanpa menginputkan password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  })

  it('TC_009 - Login tanpa menginputkan username dan password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  })

  it('TC_010 - Login dengan menginputkan spasi (whitespace) pada field username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('     ')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  })

  it('TC_011 - Login dengan menginputkan spasi (whitespace) pada field password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('      ')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('contain','Required')
  })

  it('TC_012 - Login dengan memberikan spasi di awal dan di akhir pada inputan field username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type(' Admin ')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })

  it('TC_013 - Login dengan memberikan spasi di awal dan di akhir pada inputan field password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type(' admin123 ')
    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')
  })
})