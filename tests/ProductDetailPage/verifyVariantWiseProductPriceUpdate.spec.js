import { test } from "@playwright/test";
import { Homepage } from "../../src/pages/homepage";
import { ProductDetailPage } from "../../src/pages/ProductDetailPage/productDetailPage";
import urls from "../../src/data/Urls.json";
import productDetail from "../../src/data/ProductDetail.json";

test.describe("E-commerce Product Detail → Variant Price Update", () => {
    let homepage;
    let productDetailPage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        productDetailPage = new ProductDetailPage(page);

        // ✅ Step 1: Navigate to base URL
        await homepage.navigateToPage(urls.BASE_URL);
    });

    test("Verify variant-wise product price updates correctly on selection", async ({ page }) => {
        // ✅ Step 2: Search for product
        await productDetailPage.searchProduct(productDetail.productName);

        // ✅ Step 3: Open product detail page
        await productDetailPage.enterProductPage();

        // ✅ Step 4: Verify variant price update reflects correctly
        await productDetailPage.verifyingVariantSelectionUpdatePriceCorrectly();
    });
});
