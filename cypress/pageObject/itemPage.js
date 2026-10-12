class ItemPage{
     backButton(){
        return cy.get('[data-test="back-to-products"]');
    }

    removeButton(){
        return cy.get('#remove-sauce-labs-backpack')
    }
}

export default new ItemPage();