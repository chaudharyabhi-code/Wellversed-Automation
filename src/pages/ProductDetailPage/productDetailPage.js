// src/pages/ProductDetailPage.js
import { expect } from "@playwright/test";

export class ProductDetailPage {
    constructor(page) {
        this.page = page;
    }

    // =========================================
    // 🔍 SEARCH & NAVIGATION
    // =========================================
    async searchProduct(productName) {
        const searchInput = this.page.locator(
            'div[data-testid="header-desktop-search-container"] input[placeholder="Shop for Health Supplements"]'
        );
        await expect(searchInput).toBeVisible({ timeout: 10000 });
        await searchInput.fill(productName);
        await searchInput.press("Enter");
    }

    async enterProductPage() {
        const productsGrid = this.page.locator('div[class="py-5 px-5"] div[class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"] div[class="flex flex-col items-center pb-4 bg-white rounded-lg cursor-pointer transition-colors duration-200 shadow-[0_1px_4px_#8080801c] border border-[#80808029]"]');
        await productsGrid.first().click();
        await this.page.waitForURL("**/products/**");
    }

    // =========================================
    // 🛒 PRODUCT ACTIONS
    // =========================================

    async clickAddToCartButton() {
        const addToCartButton = this.page.locator('div[data-testid="pinfo-add-to-cart"]');
        await expect(addToCartButton).toBeVisible({ timeout: 10000 });
        await addToCartButton.click();
    }

    async clickShoppingCartButton() {
        const cartButton = this.page.locator('div[data-testid="header-desktop-cart-button"]');
        await expect(cartButton).toBeVisible({ timeout: 10000 });
        await cartButton.click();
    }


    // =========================================
    // 💰 PRICE VALIDATION
    // =========================================
    async getProductPrice() { const productInfoDiv = this.page.locator('div.theme-box.product-info-widget.h-full.w-full.lg\\:max-w-\\[552px\\].mt-8.lg\\:mt-0'); const actualProductPrice = await productInfoDiv.locator('p[class="text-lg md:text-[20px] font-bold text-black leading-none"]').innerText(); return Number(actualProductPrice.replace(/[₹,]/g, "").trim()); }

    async variantPriceVerify(i) {
        const productInfoDiv = this.page.locator(
            'div.theme-box.product-info-widget.h-full.w-full.lg\\:max-w-\\[552px\\].mt-8.lg\\:mt-0'
        );

        const actualPrice = await this.getProductPrice();
        const variantPriceText = await productInfoDiv
            .locator("div.flex.gap-4.mt-3 > div")
            .nth(i)
            .locator("span.text-2xs.lg\\:text-sm.font-bold.text-black-100.mb-1")
            .innerText();

        const variantPrice = Number(variantPriceText.replace(/[₹,]/g, "").trim());
        console.log(`Variant ${i}: Expected ₹${actualPrice}, Found ₹${variantPrice}`);
        await expect(variantPrice).toBe(actualPrice);
    }

    async verifyingVariantSelectionUpdatePriceCorrectly() {
        await this.variantPriceVerify(0);
        const productInfoDiv = this.page.locator(
            'div.theme-box.product-info-widget.h-full.w-full.lg\\:max-w-\\[552px\\].mt-8.lg\\:mt-0'
        );
        await productInfoDiv.locator("div.flex.gap-4.mt-3 > div").nth(1).click();
        await this.page.waitForTimeout(2000);
        await this.variantPriceVerify(1);
    }

    // =========================================
    // ⚙️ QUANTITY HANDLERS
    // =========================================
    async setQuantity(value) {
        const quantityInput = this.page
            .locator(
                'div.border.border-surface-3.rounded-md.overflow-hidden.inline-flex.items-center'
            )
            .locator('input[inputmode="numeric"][aria-label="Quantity"]')
            .first();

        await quantityInput.fill(String(value));
    }

    async getCurrentValue() {
        const quantityInput = this.page
            .locator(
                'div.border.border-surface-3.rounded-md.overflow-hidden.inline-flex.items-center'
            )
            .locator('input[inputmode="numeric"][aria-label="Quantity"]')
            .first();

        return Number(await quantityInput.inputValue());
    }

    async increase(times = 1) {
        const quantityDiv = this.page.locator(
            'div.border.border-surface-3.rounded-md.overflow-hidden.inline-flex.items-center'
        );
        const increaseButton = quantityDiv.locator("div").nth(2);

        for (let i = 0; i < times; i++) {
            const before = await this.getCurrentValue();
            await increaseButton.click();
            await expect
                .poll(async () => await this.getCurrentValue(), {
                    timeout: 2000,
                    message: `Waiting for quantity to increase from ${before}`,
                })
                .toBe(before + 1);
        }
    }

    async decrease(times = 1) {
        const quantityDiv = this.page.locator(
            'div.border.border-surface-3.rounded-md.overflow-hidden.inline-flex.items-center'
        );
        const decreaseButton = quantityDiv.locator("div").nth(0);

        for (let i = 0; i < times; i++) {
            const before = await this.getCurrentValue();
            await decreaseButton.click();
            await expect
                .poll(async () => await this.getCurrentValue(), {
                    timeout: 2000,
                    message: `Waiting for quantity to decrease from ${before}`,
                })
                .toBe(before - 1);
        }
    }

    async getProductCountOnProductPage() {
        const quantityInput = this.page
            .locator(
                'div.border.border-surface-3.rounded-md.overflow-hidden.inline-flex.items-center'
            )
            .locator('input[inputmode="numeric"][aria-label="Quantity"]')
            .first();
        const value = await quantityInput.getAttribute("value");
        return Number(value);
    }



    // =========================================
    // 🚫 STATE VALIDATION
    // =========================================
    async checkBuyNowButtonDisabled() {
        const buyNowButton = this.page.locator('div[data-testid="pinfo-buy-now-button"]');
        await expect(buyNowButton.first()).toHaveCount(1);
        await expect(buyNowButton.first().locator("button")).toHaveAttribute("disabled", "");
    }

    async verifySoldOutButton() {
        const addToCartButton = this.page.locator('div[data-testid="pinfo-add-to-cart"]');
        const text = await addToCartButton.innerText();
        await expect(text.trim()).toBe("Sold out");
    }
}
