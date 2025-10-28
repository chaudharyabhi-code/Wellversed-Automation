import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage/loginPage";
import productData from "../src/data/ProductDetail.json"
import loginData from "../src/data/LoginPageData.json"
import { Homepage } from "../src/pages/homepage";
import urls from "../src/data/Urls.json"
import { ProductDetailPage } from "../src/pages/productDetailPage";
// Test Suite 2: Search first -> Checkout -> Login during checkout
// --------------------------------------
test.describe("E-commerce Positive Flow → Search Product → Login at Checkout → Complete Purchase", () => {
    let homepage;
    let login;
    let productDetailPage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        login = new LoginPage(page);
        productDetailPage = new ProductDetailPage(page)
        await homepage.navigateToPage(urls.BASE_URL);
        await page.waitForTimeout(3000);
    });

    test("User searches for a product and logs in on the checkout page", async ({ page }) => {
        await productDetailPage.searchProduct(productData.productName);
        await   productDetailPage.enterProductPage()  
        await  productDetailPage.clickAddToCartButton();   // ✅ navigate into PDP
            // await login.checkoutFlow("new", loginData.validNumber);
    });
});