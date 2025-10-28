import { test } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import { verifyProductPriceOnHomePageAndProductDetailPage } from "../src/pages/verifyProductPriceOnHomePageAndProductDetailPage";
import data from "../src/data/Urls.json"
import products from "../src/data/ProductDetail.json"
test.describe("", () => {

    let homepage;
    let verifyPrice;
    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page)
        verifyPrice = new verifyProductPriceOnHomePageAndProductDetailPage(page)
    })


    test("verify product price on Home page and Product Detail page", async ({ page }) => {
        await homepage.navigateToPage(data.BASE_URL);
        await verifyPrice.verifyProductPriceOnHomePageAndProductDetailPage(products.productName);

    })

})

