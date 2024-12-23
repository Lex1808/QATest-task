describe('Test Task', () => {
  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
  });

  it('Search for products by value "ro"', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');
    cy.get('[placeholder="Search for Vegetables and Fruits"]').should('have.value', 'ro');
  });

  it('Verify that search results contain "ro"', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');

    cy.get('.product:visible').each(($el) => {
      const ProductName = $el.find('h4.product-name').text();
      expect(ProductName.toLowerCase()).to.include('ro');
    });
  });

  it('Set the quantity to 5 for the product "Carrot"', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');
    cy.get('.product:contains("Carrot") .quantity')
      .clear()
      .type('5')
      .should('have.value', '5');
  });

  it('Setting the quantity to 3 for the product "Mushroom" using the increment button', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');
    cy.get('.product:contains("Mushroom") .quantity').clear();
    for (let i = 0; i < 3; i++) {
      cy.get('.product:contains("Mushroom") .increment').click();
    }
    cy.get('.product:contains("Mushroom") .quantity').should('have.value', '3');
  });

  it('Adding the products "Carrot" and "Mushroom" to the cart', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');
    cy.get('.product:contains("Carrot") .product-action').click();
    cy.get('.product:contains("Mushroom") .product-action').click();

    cy.get('.cart-icon img').click();
    cy.get('.cart-items').should('contain', 'Carrot').and('contain', 'Mushroom');
  });

  it('Remove the product "Carrot" from the cart', () => {
    cy.get('[placeholder="Search for Vegetables and Fruits"]').type('ro');
    cy.get('.product:contains("Carrot") .product-action').click();
    cy.get('.cart-icon img').click();
    cy.get('.cart-items .cart-item .product-info').contains('Carrot')
      .parents('.cart-item') 
      .find('.product-remove') 
      .click();
    cy.get('.cart-items').should('not.exist'); 
  });
})
