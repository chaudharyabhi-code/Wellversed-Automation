import { test } from "@playwright/test";
import productDetail from "../src/data/ProductDetail.json"
import { Homepage } from "../src/pages/homepage";
import urls from "../src/data/Urls.json"
import { ProductDetailPage } from "../src/pages/productDetailPage";
test.describe(() => {
    let homePage;
    let productDetailPage;
    test.beforeEach(async ({ page }) => {
        homePage = new Homepage(page)
        productDetailPage=new ProductDetailPage(page)
    })


    test("verifying the buy now button(disabled) on product detail page for Logout user", async ({ page }) => {
        await homePage.navigateToPage(urls.BASE_URL)
        await productDetailPage.searchProduct(productDetail.productName)
        await productDetailPage.enterProductPage();
        await productDetailPage.checkBuyNowButtonDisabled();
    })
    
    // Hold for Login User
    // test("verifying the buy now button(enabled) on product detail page for Login user", async ({ page }) => {
    //     await homePage.navigateToPage(urls.BASE_URL)
    //     await productDetailPage.searchProduct(productDetail.productName)
    //     await productDetailPage.enterProductPage();
    //     await productDetailPage.checkBuyNowButtonDisabled();
    // })
})