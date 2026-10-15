class CartPage {
    continueShoppingButton() {
        return cy.get('#continue-shopping')
    }

    checkoutButton() {
        return cy.get('#checkout')
    }

    title(){
        return cy.get(".title")
    }
}
export default new CartPage()