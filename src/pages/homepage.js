import {expect} from '@playwright/test';

export class Homepage{
    /**
    * @param {Page} page - Playwright page object representing the browser page instance
    */

    constructor(page){
           this.page=page;

    }
    async navigateToPage(url) {
        await this.page.goto(url);
        await this.page.waitForSelector('title', { state: 'attached' });
    }

    async navigateCategory(category, submenulinkname){
        await this.page.hover('[data-testid="nav-desktop-shop-by-category"]');
        await this.page.waitForTimeout(2000);
        const productCategorySubmenu = this.page.locator(`[data-testid="nav-desktop-category-${category}"]`)
        await expect(productCategorySubmenu).toBeVisible({ timeout: 5000 });
        await productCategorySubmenu.hover();
        await this.page.waitForTimeout(500);
        const productCategory = this.page.locator(`[data-testid="nav-desktop-category-${submenulinkname}"]`)
        await expect(productCategorySubmenu).toBeVisible({ timeout: 5000 });
        await productCategory.click();
    }

    async navigateBrands(brands){
        await this.page.hover('[data-testid="nav-desktop-brands"]');
        const brandCategory= this.page.locator(`[data-testid="nav-desktop-brand-${brands}"]`);
        await expect(brandCategory).toBeVisible({ timeout: 5000 });
        await brandCategory.click();
    }

    async navigateHeaderMenuLink(menulink){
        const collectionMenu=this.page.locator(`[data-testid="nav-desktop-${menulink}"]`);
        await collectionMenu.click();
    }

    async verifyURL(url){
        await expect(this.page).toHaveURL(url);
    }

    async verifyThePageHeading(heading) {
        const pageHeading = this.page.locator('h1').nth(1);
        await expect(pageHeading).toHaveText(heading);
    }

    async navigateFooterLinks(footerlinks){
        const footerlink = this.page.locator(`[data-testid='footer-${footerlinks}']`);
        const scroll = this.page.locator('.mt-0');
        await scroll.scrollIntoViewIfNeeded();
        await footerlink.click();
        await this.page.waitForTimeout(2000);
    }

    async verifyCTA(CTAbutton){
        const CTAbtn= this.page.locator(`//*[h2="${CTAbutton}"]//parent::div//following-sibling::div//*[@data-testid="cardwrapper-view-all"]`);
        await CTAbtn.click();
    }

    async readMore(){
        const readbtn= this.page.locator(`[data-testid="supplements-v1-read-more"]`);
        await readbtn.click();
    }

    async showLess() {
        const lessbtn = this.page.locator(`[data-testid="supplements-v1-show-less"]`);
        await lessbtn.waitFor({ state: 'visible', timeout: 5000 });
        await lessbtn.click();
    }

    async mainBannerCTA(carouselnumber){
        const mainbanner= this.page.locator(`[data-testid="carousel-slide-${carouselnumber}"]`).first();
        await mainbanner.click();
    }

    async secondaryBannerCTA(carouselnumber){
        const mainbanner= this.page.locator(`[data-testid="carousel-slide-${carouselnumber}"]`).nth(1);
        await mainbanner.click();
    }

    async socialMediaCTA(socialmedia){
        const socialmedialink = this.page.locator(`[data-testid="footer-social-${socialmedia}"]`)
        const scroll = this.page.locator('.mt-0');
        await scroll.scrollIntoViewIfNeeded();
        await socialmedialink.click()
    }

    async verifyTestimonialPresence(testimonialcard){
        const testimoniallink= this.page.locator(`["data-testid="testimonials-v1-card-${testimonialcard}"]`)
    }

    async addToCart(productName){
      await this.page.waitForTimeout(2000)
        const addtocart =this.page.locator(`//*[text()="${productName}"]//parent::div//following-sibling::button[@data-testid='productcard-add-to-cart']`)
        await addtocart.click()
    }

    async goToCart(){
        const cart=this.page.locator(`[data-testid="header-desktop-cart-button"]`)
        await cart.click();
    }

    async clickByText(text){
        const textmsg=this.page.locator(`//*[text()="${text}"]`)
        await textmsg.click();
    }

    async applyCoupon(viewoffersbtn,couponname){
        await this.clickByText(viewoffersbtn);
        const couponcode=this.page.locator(`//*[text()="${couponname}"]//parent::div//following-sibling::button[text()="Apply"]`)
        await couponcode.click();
    }


    // Abhi Code

      async verfiyWhatsappRedirection() {
      const whatsappLink =await this.page.locator('img[alt="WhatsApp"]').locator('..');

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      whatsappLink.click(),
    ]);

    await expect(newPage).toHaveURL(/api\.whatsapp\.com\/send/);
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
    
    async verifyProductPriceOnHomePageAndProductDetailPage(productName) {
        const priceOnHomepage = await this.priceOfaProductOnHomepage(productName);
        await this.redirectToProductPage(productName)
        // console.log(priceOnHomepage);

        const priceOnProductpage=await this.priceOfaProductOnProductpage(productName)
        // console.log(priceOnProductpage);
        await expect(priceOnProductpage).toBe(priceOnHomepage);

    }



            

        async verifyRupeeSymbol(Heading) {
            console.log(Heading)

        
            let ProductSection = await this.page.locator(`//h2[text()="${Heading}"]`)
                .locator("..").
                locator('div[class="grid gap-x-[11px] gap-y-5 sm:gap-y-6 md:gap-y-7 grid-cols-2 lm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full"] div[data-testid="productcard"]')
                ;
                let count=await ProductSection.count();
            for (var i = 0; i < count; i++) {
                const priceText = (await ProductSection
                    .nth(i).locator('span[data-testid="productcard-price"]')

                    .textContent()
                ).trim();

                console.log(priceText);

                // Assert ₹ symbol
                expect(priceText).toContain('₹');

            }
        }

        async verifyRupeeSymbolForFitnessComboSection() {
            let bestSellerProductCount = await this.page.locator('//h2[text()="Best Sellers"]')
                .locator("..").
                locator('div[class="grid gap-x-[11px] gap-y-5 sm:gap-y-6 md:gap-y-7 grid-cols-2 lm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full"] div[data-testid="productcard"]')
                .count();
            for (var i = 0; i < bestSellerProductCount; i++) {
                const priceText = (await this.page
                    .locator('div[data-testid="productcard"]').nth(i).locator('span[data-testid="productcard-price"]')

                    .textContent()
                ).trim();

                console.log(priceText);

                // Assert ₹ symbol
                expect(priceText).toContain('₹');

            }
        
          } 

}

