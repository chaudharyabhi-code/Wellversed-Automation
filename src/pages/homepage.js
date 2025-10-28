import {expect} from '@playwright/test';

export class Homepage{
    /**
    * @param {Page} page - Playwright page object representing the browser page instance
    */

    constructor(page){
           this.page=page;

               this.whatsappLink = page.locator('img[alt="WhatsApp"]').locator('..');


    //     //Button that opens profile menu
    //     this.userProfileIcon=page.locator(`[data-testid='${profileicon}']`);

    //     //Profile Modal Text
    //     this.profileModal=page.locator("p:has-text('Welcome')");

    //     //Authentication Page
    //     this.loginSignup=page.locator(`[data-testid='${loginbutton}']`);

    //     //OTP Authentication Modal
    //     this.OTPModal=page.locator("h3:has-text('Unlock!')");

    //     //Cart Button
    //     this.userCartButton=page.locator(`[data-testid='${cartbutton}']`);

    }

     async verifyRedirection() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.whatsappLink.click(),
    ]);

    await expect(newPage).toHaveURL(/api\.whatsapp\.com\/send/);
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
        await expect(this.page).toHaveURL(url)
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

}