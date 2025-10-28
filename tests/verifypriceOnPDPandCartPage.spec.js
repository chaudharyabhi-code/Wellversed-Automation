import { expect, test } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import { ProductDetailPage } from "../src/pages/productDetailPage";
import { CartPageCheckout } from "../src/pages/cartPageCheckout";
import urls from "../src/data/Urls.json";
import productInfo from "../src/data/ProductDetail.json";

test.describe("E-commerce Product Detail → PDP vs Cart Price Parity", () => {
    let homepage;
    let productDetailPage;
    let checkoutCart;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        productDetailPage = new ProductDetailPage(page);
        checkoutCart = new CartPageCheckout(page);

        // ✅ Step 1: Open homepage
        await homepage.navigateToPage(urls.BASE_URL);
    });

    test("Verify price parity between PDP and Cart after adding product", async ({ page }) => {
        // ✅ Step 2: Search product
        await productDetailPage.searchProduct(productInfo.productName);

        // ✅ Step 3: Enter product detail page
        await productDetailPage.enterProductPage();

        // ✅ Step 4: Capture product price from PDP
        const productPrice = await productDetailPage.getProductPrice();

        // ✅ Step 5: Add product to cart and open cart drawer/page
        await productDetailPage.clickAddToCartButton();
        await productDetailPage.clickShoppingCartButton();
        await page.waitForTimeout(1500); // small wait for animation


        // ✅ Step 6: Capture product price from checkout/cart
        const checkoutPrice = await checkoutCart.checkoutPrice();

        console.log("PDP Price:", productPrice, "Cart Price:", checkoutPrice);

        // ✅ Step 7: Validate price parity
        await expect(productPrice, "Price mismatch between PDP and Cart").toBe(checkoutPrice);
    });
});
