import { expect } from "@playwright/test";

export class verifyProductPriceOnHomePageAndProductDetailPage {
    constructor(page) {
        this.page = page;
    }



    async priceOfaProductOnHomepage(productName) {
        const price = await this.page.locator(`xpath=(//h3[text()="${productName}"]/parent::*[@data-testid="productcard-title"])[1]//following::span[@data-testid="productcard-price"][1]`).innerText();
        return Number(price.replace(/[₹,]/g, '').trim()); 
    }

    async redirectToProductPage(productName) {
        await this.page.locator(`xpath=(//h3[text()="${productName}"]/parent::*[@data-testid="productcard-title"])[1]//following::span[@data-testid="productcard-price"][1]`).click();
        await this.page.waitForURL("**/products/**")
    }

    async priceOfaProductOnProductpage(productName) {
        const price = await this.page.locator(`xpath=(//p[text()="${productName}"]/parent::div//following::p[@data-testid="info-price-label"]/following-sibling::p)[1]`).innerText();
       return Number(price.replace(/[₹,]/g, '').trim());
    }
    q
    async verifyProductPriceOnHomePageAndProductDetailPage(productName) {
        const priceOnHomepage = await this.priceOfaProductOnHomepage(productName);
        await this.redirectToProductPage(productName)
        // console.log(priceOnHomepage);

        const priceOnProductpage=await this.priceOfaProductOnProductpage(productName)
        // console.log(priceOnProductpage);
        await expect(priceOnProductpage).toBe(priceOnHomepage);

    }









}