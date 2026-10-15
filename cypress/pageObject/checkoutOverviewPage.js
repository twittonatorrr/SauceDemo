class CheckoutOverviewPage{
    finishBtn(){
        return cy.get("#finish")
    }

    cancelBtn(){
        return cy.get("#cancel")
    }

    title(){
        return cy.get(".title")
    }

    summary(){
        return cy.get(".summary_info")
    }
}
export default new CheckoutOverviewPage()