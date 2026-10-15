class ItemPage{
     backButton(){
        return cy.get('[data-test="back-to-products"]');
    }

    removeButton(){
        return cy.get('#remove-sauce-labs-backpack')
    }

    cartButton(){
        return cy.get('#shopping_cart_container')
    }
}

export default new ItemPage();