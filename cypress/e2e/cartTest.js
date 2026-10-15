import testData from "../fixtures/testData.json";
import LoginPage from "../pageObject/loginPage";
import MainPage from "../pageObject/mainPage";
import ItemPage from "../pageObject/itemPage";
describe("Cart Tests", () => {

    beforeEach(() => {
        cy.visit(testData.baseUrl);
        LoginPage.login(testData.standardUsername, testData.validPassword);
    });

    it("TC-17: should open an empty cart", ()=>{
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".title").should("contain.text", "Your Cart").and("be.visible");
        cy.get("#continue-shopping").should("be.visible");
        cy.get("#checkout").should("be.visible");
    });

    it("TC-18: should add a 3 items to the cart", () => {
        cy.get(".inventory_item").each(($el, index) => {
            if(index < 3) {
                cy.wrap($el).find(".btn_inventory").click();
            } else{
                return false;
            }
        });
        MainPage.cartBadge().should("have.text", "3");
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 3);
    })

    it("TC-19: should remove an item from the cart", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        MainPage.cartBadge().should("be.visible").and("have.text", "1");
        MainPage.removeButton().should("be.visible").click();
        MainPage.cartBadge().should("not.exist");
        MainPage.removeButton().should("not.exist");
        MainPage.addToCartButton().should("be.visible");
    })

    it("TC-20: should remove one item from the cart list", ()=>{
        cy.get(".inventory_item").each(($el, index) => {
            if(index < 3) {
                cy.wrap($el).find(".btn_inventory").click();
            } else{
                return false;
            }
        });
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 3);
        cy.get(".cart_item").first().find(".cart_button").click();
        cy.get(".cart_item").should("have.length", 2);
    })

    it("TC-21: should continue shopping from the cart page", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get("#continue-shopping").click();
        cy.url().should("contain", "/inventory.html");
        MainPage.cartBadge().should("be.visible").and("have.text", "1");
    })

    it.only("TC-22: should navigate to the product page from the cart page and return back", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 1);
        cy.get(".cart_item").first().find(".inventory_item_name").click();
        cy.url().should("contain", "/inventory-item.html");
        ItemPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 1);
    })

    it("TC-23: should check item details from the cart page", () => {
        cy.get(".inventory_item").first().find(".btn_inventory").click();cy.get(".inventory_item").first().find(".btn_inventory").click();
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").first().find(".inventory_item_name").click();
        cy.url().should("contain", "/inventory-item.html");
        cy.get(".inventory_details_name").should("be.visible");
        cy.get(".inventory_details_desc").should("be.visible");
        cy.get(".inventory_details_price").should("be.visible");
        cy.get(".inventory_details_img_container").should("be.visible");
    
    })
    
});