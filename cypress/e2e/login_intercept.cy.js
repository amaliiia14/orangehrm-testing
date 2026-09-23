describe ('Verifikasi proses login pada website OrangeHRM', () => {
  it('TC_001 - Login dengan username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary'). as('actionSummary')

    cy.get('button[type="submit"]').click()
    cy.url().should('include','/dashboard')

    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
  })

  it('TC_002 - Login dengan username dan password yang belum terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin2')
    cy.get('input[placeholder="Password"]').type('admin222')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })

  it('TC_003 - Login dengan username menggunakan huruf kecil dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts'). as('shortcuts')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@shortcuts').its('response.statusCode').should('eq', 200)
  })

  it('TC_004 - Login dengan username valid dan password menggunakan huruf besar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('ADMIN123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })

  it('TC_005 - Login dengan invalid username dan valid password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin123')
    cy.get('input[placeholder="Password"]').type('admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })

  it('TC_006 - Login dengan valid username dan invalid password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('Admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })

  it('TC_012 - Login dengan memberikan spasi di awal dan di akhir pada inputan field username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type(' Admin ')
    cy.get('input[placeholder="Password"]').type('admin123')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })

  it('TC_013 - Login dengan memberikan spasi di awal dan di akhir pada inputan field password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type(' admin123 ')

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'). as('messages')

    cy.get('button[type="submit"]').click()
    cy.get('div[role="alert"]').should('contain','Invalid credentials')

    cy.wait('@messages').its('response.statusCode').should('eq', 304)
  })
})