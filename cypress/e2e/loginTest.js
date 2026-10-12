import testData from "../fixtures/testData.json";
import LoginPage from "../pageObject/loginPage";
import MainPage from "../pageObject/mainPage";
describe("Login Tests", () => {
    beforeEach(() => {
        LoginPage.visit();
    })

    it("should log in successfully with valid credentials", () => {
        LoginPage.typeUsername(testData.standardUsername);
        LoginPage.typePassword(testData.validPassword);
        LoginPage.clickLoginButton();
        cy.url().should("contain", "/inventory.html");
        MainPage.appLogo().should("be.visible");
    })

    it("should display an error message with invalid password", () => {
        LoginPage.typeUsername(testData.standardUsername);
        LoginPage.typePassword(testData.invalidPassword);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Username and password do not match any user in this service");
    })

    it("should display an error message with invalid username", () => {
        LoginPage.typeUsername(testData.invalidUsername);
        LoginPage.typePassword(testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Username and password do not match any user in this service");
    })

    it("should display an error message with empty username", () => {
        LoginPage.typePassword(testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Username is required");
    })

    it("should display an error message with empty password", () => {
        LoginPage.typeUsername(testData.standardUsername);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Password is required");
    })

    it("should display an error message with empty username and password", () => {
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Username is required");
    })

    it("should log in as a locked out user and display an error message", () => {
        LoginPage.typeUsername(testData.lockedOutUsername);
        LoginPage.typePassword(testData.validPassword);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible").and("contain", "Sorry, this user has been locked out.");
    })

    it("should log in as a problem user and fail because of wrong pictures", () => {
        LoginPage.typeUsername(testData.problemUsername);
        LoginPage.typePassword(testData.validPassword);
        LoginPage.clickLoginButton();
        cy.url().should("contain", "/inventory.html");
        cy.get("img[data-test='inventory-item-sauce-labs-backpack-img']").should("have.attr", "src").and("contain", "/assets/sauce-backpack-1200x1500-CjRW-Djj.jpg");
    })

    it("should close the error message", () => {
        LoginPage.typeUsername(testData.standardUsername);
        LoginPage.typePassword(testData.invalidPassword);
        LoginPage.clickLoginButton();
        LoginPage.errorMessage().should("be.visible");
        LoginPage.clickErrorCloseButton();
        LoginPage.errorMessage().should("not.exist");
        })
    })