class CheckoutInformationPage {
    firstName(){
        return cy.get("#first-name")
    }

    lastName(){
        return cy.get("#last-name")
    }

    postalCode(){
        return cy.get("#postal-code")
    }

    continueBtn(){
        return cy.get("#continue")
    }

    cancelBtn(){
        return cy.get("#cancel")
    }

    errorMessage(){
        return cy.get(".error-message-container")
    }

}
export default new CheckoutInformationPage()