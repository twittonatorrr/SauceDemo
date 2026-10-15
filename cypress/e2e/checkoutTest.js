import testData from "../fixtures/testData.json";
import LoginPage from "../pageObject/loginPage";
import MainPage from "../pageObject/mainPage";
import CartPage from "../pageObject/cartPage";
import CheckoutInformationPage from "../pageObject/checkoutInformationPage";
import CheckoutOverviewPage from "../pageObject/checkoutOverviewPage";

describe("Checkout Tests", () => {
    
    beforeEach(() => {
        cy.visit(testData.baseUrl);
        LoginPage.login(testData.standardUsername, testData.validPassword);
    });

    it("TC-24: open checkout page from the cart page", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();
        
        cy.url().should("contain", "/checkout-step-one.html");
        CheckoutOverviewPage.title().should("be.visible").and("contain", "Checkout: Your Information");
        cy.get(".checkout_info").should("be.visible");
    })

    it("TC-25: should fill in the checkout information and continue to the next step", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();

        cy.url().should("contain", "/checkout-step-two.html");
        CheckoutOverviewPage.title().should("be.visible").and("contain", "Checkout: Overview");
        CheckoutOverviewPage.summary().should("be.visible");
    })

    it("TC-26: should checkout without filling first name and display an error message", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();
        CheckoutInformationPage.errorMessage().should("be.visible").and("contain", "Error: First Name is required");
    })

    it("TC-27: should checkout without filling last name and display an error message", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();
        CheckoutInformationPage.errorMessage().should("be.visible").and("contain", "Error: Last Name is required");
    })

    it("TC-28: should checkout without filling postal code and display an error message", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.continueBtn().click();
        CheckoutInformationPage.errorMessage().should("be.visible").and("contain", "Error: Postal Code is required");
    })

    it("TC-29: should checkout without any fields filled and display an error message", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.continueBtn().click();
        CheckoutInformationPage.errorMessage().should("be.visible").and("contain", "Error: First Name is required");
    })

    it("TC-30: should cancel the checkout process and return to the cart page", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.cancelBtn().click();

        cy.url().should("contain", "/cart.html");
        CartPage.title().should("be.visible").and("contain", "Your Cart");
    })

    it("TC-31: should add items to the cart", () => {
        MainPage.itemsList().each(($el, index) => {
            if(index < 3) {
                cy.wrap($el).find(".btn_inventory").click();
            }
        })
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        cy.get(".cart_item").should("have.length", 3);
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();

        cy.url().should("contain", "/checkout-step-two.html");
        CheckoutOverviewPage.summary().should("be.visible");
        cy.get(".cart_item").should("have.length", 3);
        const prices = [];
        cy.get(".inventory_item_price").each(($el) => {
            const price = parseFloat($el.text().replace("$", ""));
            prices.push(price);
        }).then(() => {
            const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
            cy.get(".summary_subtotal_label").should("contain", `Item total: $${totalPrice.toFixed(2)}`);
        })
    })

    it("TC-32: should complete the checkout process and display the confirmation page", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();

        cy.url().should("contain", "/checkout-step-two.html");
        CheckoutOverviewPage.summary().should("be.visible");
        cy.get(".cart_item").should("have.length", 1);
        CheckoutOverviewPage.finishBtn().click();

        cy.url().should("contain", "/checkout-complete.html");
        cy.get(".complete-header").should("be.visible").and("contain", "Thank you for your order!");
        cy.get(".complete-text").should("be.visible").and("contain", "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    })

    it("TC-33: should cancel the checkout process and return to the cart page", () => {
        MainPage.firstItem().find(".btn_inventory").click();
        MainPage.cartButton().click();

        cy.url().should("contain", "/cart.html");
        CartPage.checkoutButton().click();

        CheckoutInformationPage.firstName().type("firstName")
        CheckoutInformationPage.lastName().type("lastName")
        CheckoutInformationPage.postalCode().type("12345")
        CheckoutInformationPage.continueBtn().click();

        cy.url().should("contain", "/checkout-step-two.html");
        CheckoutOverviewPage.summary().should("be.visible");
        cy.get(".cart_item").should("have.length", 1);
        CheckoutOverviewPage.finishBtn().click();

        cy.url().should("contain", "/checkout-complete.html");
        cy.get(".complete-header").should("be.visible").and("contain", "Thank you for your order!");
        cy.get(".complete-text").should("be.visible").and("contain", "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
        cy.get("#back-to-products").click();

        cy.url().should("contain", "/inventory.html");
        MainPage.cartBadge().should("not.exist");
    })
})