import { test } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import { ProductDetailPage } from "../src/pages/ProductDetailPage/productDetailPage";
import urls from "../src/data/Urls.json";
import productInfo from "../src/data/ProductDetail.json";

test.describe("E-commerce Product Detail → Out-of-Stock Variant", () => {
    let homepage;
    let searchproduct;
    let productDetailPage;
    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        productDetailPage = new ProductDetailPage(page);

        // ✅ Step 1: Navigate to base URL
        await homepage.navigateToPage(urls.BASE_URL);
    });

    test("Verify Out-of-Stock variant shows disabled 'Buy Now' and 'Sold Out' button", async ({ page }) => {
        // ✅ Step 2: Search for product that is Out of Stock
        await productDetailPage.searchProduct(productInfo.OutOfStockProductName);

        // ✅ Step 3: Open product details page
        await productDetailPage.enterProductPage();

        // ✅ Step 4: Verify Buy Now button is visible but disabled
        await productDetailPage.checkBuyNowButtonDisabled();

        // ✅ Step 5: Verify Add to Cart button shows “Sold out”
        await productDetailPage.verifySoldOutButton();
    });
});
