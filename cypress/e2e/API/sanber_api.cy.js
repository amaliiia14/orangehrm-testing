describe('API testing', () => {
  it('Get a single category by ID', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('slug')
      expect(response.body).to.have.property('image')
      expect(response.body.id).to.eq(2)
    })
  })

  it('Get All Category', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
    .then((response) => {
      expect(response.status).to.eq(200)
      response.body.forEach(item => {
        expect(item).to.have.property('id')
        expect(item).to.have.property('name')
        expect(item).to.have.property('slug')
        expect(item).to.have.property('image')
      })
    })
  })

  it('Get a single category by slug', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/slug/electronics')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('slug')
      expect(response.body).to.have.property('image')
    })
  })

  it('Create a category', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories', 
      body: {
        "name": "Semangat 45",
        "image": "https://placeimg.com/2345/"
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.name).to.eq('Semangat 45')
    })
  })
  
  it('Create a category with invalid image url', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories',
      body: {
        "name":"T-shirt",
        "image":"ini gambarnya"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.exist
    })
  })

  it('Update a category', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/39',
      body: {
        "name":"yuk ayo semangat",
        "image":"https://placeimg.com/640/480/any"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('yuk ayo semangat')
    })
  })

  it('Update category name only', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://api.escuelajs.co/api/v1/categories/40',
      body: {
        "name":"semangat yuk ayo semangat"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.message).to.exist
    })
  })

  it('Update category image url only', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://api.escuelajs.co/api/v1/categories/40',
      body: {
        "image":"https://placeimg.com/640/480/new"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.message).to.exist
    })
  })

  it('Get all products by category', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2/products')
    .then((response) => {
      expect(response.status).to.eq(200)
      response.body.forEach(item => {
        expect(item).to.have.property('id')
        expect(item).to.have.property('slug')
        expect(item).to.have.property('images')
      })
    })
  })

  it('Delete a category', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/56'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
    })
  })

  it('Get request using the deleted category ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/56',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.exist
    })
  })

  it('Get a single category with invalid ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/abc',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq('Validation failed (numeric string is expected)')
    })
  })
})

