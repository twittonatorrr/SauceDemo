import testData from "../fixtures/testData.json"
import LoginPage from "../pageObject/loginPage"
import MainPage from "../pageObject/mainPage"

describe("Special Cases and Users Suite", ()=>{

    beforeEach(()=>{
        cy.visit(testData.baseUrl)
        LoginPage.login(testData.standardUsername, testData.validPassword)
    })

    it("TC-34: Logout", ()=>{
        MainPage.burgerMenuBtn().click();
        MainPage.logoutBtn().click();
        LoginPage.usernameInput().should("be.visible");
        LoginPage.passwordInput().should("be.visible");
        LoginPage.loginButton().should("be.visible")
    })

    it("TC-35: should fail after trying to open main page without login", ()=>{
        MainPage.burgerMenuBtn().click();
        MainPage.logoutBtn().click();
        cy.visit(
            "https://www.saucedemo.com/inventory.html",
            {failOnStatusCode: false}
        )
        LoginPage.errorMessage().should("be.visible").and("contain", "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })

    it("TC-36: should check if the app reset works correctly", ()=>{
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartBadge().should("be.visible").and("contain", 1);
        MainPage.burgerMenuBtn().click();
        MainPage.resetAppBtn().click();
        MainPage.cartBadge().should("not.exist");
    })

    it("TC-37: should check options inside burger menu", ()=>{
        MainPage.burgerMenuBtn().click();
        cy.get(".bm-item").should("be.visible").and("have.length", 5);
    })
})