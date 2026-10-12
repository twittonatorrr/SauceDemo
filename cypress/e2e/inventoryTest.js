import LoginPage from "../pageObject/loginPage";
import testData from "../fixtures/testData.json";
import MainPage from "../pageObject/mainPage";
import ItemPage from "../pageObject/itemPage";

describe("Inventory Tests", () => {

    beforeEach(() => {
        cy.visit(testData.baseUrl);
        LoginPage.login(testData.standardUsername, testData.validPassword);
    });

    it("should display the products after login", () => {
        cy.url().should("contain", "/inventory.html");
        MainPage.appLogo().should("be.visible");
        MainPage.itemsList().should("have.length", 6);
        cy.get("#inventory_container").each(($el) => {
            cy.wrap($el).find(".inventory_item_img").should("be.visible");
            cy.wrap($el).find(".inventory_item_label").should("be.visible");
            cy.wrap($el).find(".inventory_item_price").should("be.visible");
            cy.wrap($el).find(".btn_inventory").should("be.visible");
        });
    });

    it("should sort products by name (Z to A)", () => {
      MainPage.sortButton().select("za");
      cy.get(".inventory_item_name").then(($names) => {
            const listOfNames = [...$names].map((item)=> item.innerText);
            const expectedNames = [...listOfNames].sort().reverse();
            expect(listOfNames).to.deep.equal(expectedNames);
        })
    })

    it("should sort products by price (low to high)", () => {
        MainPage.sortButton().select("lohi");
        cy.get(".inventory_item_price").then(($prices) => {
            const listOfPrices = [...$prices].map((item)=> Number(item.innerText.replace("$", "")));
            const expectedPrices = [...listOfPrices].sort((a,b) => a-b);
            expect(listOfPrices).to.deep.equal(expectedPrices);
        });
    })

    it("should sort products by price (high to low)", () => {
        MainPage.sortButton().select("hilo");
        cy.get(".inventory_item_price").then(($prices) => {
            const listOfPrices = [...$prices].map((item)=> Number(item.innerText.replace("$", "")));
            const expecetdPrices = [...listOfPrices].sort((a,b) => b-a);
            expect(listOfPrices).to.deep.equal(expecetdPrices);
        })
    })

    it("should navigate to the product page when clicking on a product", () => {
        cy.get(".inventory_item_name").first().click();
        cy.url().should("contain", "/inventory-item.html");
        cy.get(".inventory_details_name").should("be.visible");
        cy.get(".inventory_details_desc").should("be.visible");
        cy.get(".inventory_details_price").should("be.visible");
        cy.get(".inventory_details_img_container").should("be.visible");
    })

    it("back to the catalog when clicking on the back button", () => {
        cy.get(".inventory_item_name").first().click();
        ItemPage.backButton().click();
        cy.url().should("contain", "/inventory.html");
        MainPage.itemsList().should("have.length", 6);
        cy.get(".title").should("be.visible").and("contain", "Products");
    })

    it("should add a product to the cart and verify the cart badge", () => {
        MainPage.itemsList().first().within(() => {
            MainPage.addToCartButton().click();
        });
        MainPage.cartBadge().should("be.visible").and("contain", "1");
        cy.get("#remove-sauce-labs-backpack").should("be.visible");
        MainPage.cartButton().click();
        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 1);
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
    })
})