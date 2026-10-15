import { baseUrl } from "../fixtures/testData.json";
import MainPage from "../pageObject/mainPage"
class LoginPage{

    usernameInput(){
        return cy.get("#user-name");
    }

    passwordInput(){
        return cy.get("#password");
    }

    loginButton(){
        return cy.get("#login-button");
    }

    errorMessage(){
        return cy.get("[data-test='error']");
    }

    errorCloseButton(){
        return cy.get("[data-test='error-button']");
    }

    visit(){
        cy.visit(baseUrl);
    }

    typeUsername(username){
        this.usernameInput().type(username);
    }

    typePassword(password){
        this.passwordInput().type(password);
    }

    clickLoginButton(){
        this.loginButton().click();
    }

    clickErrorCloseButton(){
        this.errorCloseButton().click();
    }

    login(username, password){
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLoginButton();
    }
}

export default new LoginPage();