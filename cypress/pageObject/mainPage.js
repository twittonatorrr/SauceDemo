import CartPage from "../pageObject/cartPage"
class MainPage{
    appLogo(){
        return cy.get('.app_logo')
    }

    itemsList(){
        return cy.get('.inventory_item')
    }

    sortButton(){
        return cy.get('.product_sort_container')
    }

    cartButton(){
        return cy.get('#shopping_cart_container')
    }

    cartBadge(){
        return cy.get('.shopping_cart_badge')
    }

    addToCartButton(){
        return cy.get('.btn_inventory')
    }

    removeButton(){
        return cy.get('#remove-sauce-labs-backpack')
    }

    firstItem(){
        return cy.get('.inventory_item').first()
    }

    burgerMenuBtn(){
        return cy.get("#react-burger-menu-btn")
    }

    logoutBtn(){
        return cy.get("#logout_sidebar_link")
    }

    resetAppBtn(){
        return cy.get("#reset_sidebar_link")
    }
}

export default new MainPage()