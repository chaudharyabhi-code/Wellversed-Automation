import { expect } from "@playwright/test";

export class CartPageCheckout {
  constructor(page) {
    this.page = page;
  }

  // ✅ Verify and return the checkout price
  async checkoutPrice() {
    const cartDrawer = this.page.locator('div[data-testid="cart-drawer"]');
    const checkoutPriceLabel = cartDrawer.locator(
      'p.text-18.text-bs-body-color.font-semibold.leading-normal.mb-0'
    );

    await expect(cartDrawer).toBeVisible({ timeout: 5000 });

    // Wait for price to become non-zero (useful for async price updates)
    await expect.poll(async () => {
      const text = await checkoutPriceLabel.textContent();
      const value = Number(text?.replace(/[₹,]/g, "").trim() || 0);
      return value;
    }, {
      message: "Waiting for checkout price to update from 0",
      timeout: 4000,
    }).not.toBe(0);

    // Fetch and log final clean price
    const priceText = await checkoutPriceLabel.textContent();
    const cleanPrice = Number(priceText.replace(/[₹,]/g, "").trim());
    console.log(`💰 Checkout Price: ₹${cleanPrice}`);
    return cleanPrice;
  }

  // ✅ Verify and return the product quantity on the cart page
  async productQuantityOnCartPage() {
    const quantityValue = this.page.locator(
      'div.theme-box.cart-item-details p.quantity-value.mx-2.mb-0.font-semibold.text-\\[13px\\].min-w-4.text-center'
    );

    await expect(quantityValue).toBeVisible({ timeout: 5000 });

    const quantityText = await quantityValue.innerText();
    const quantity = Number(quantityText.trim());

    console.log(`🛒 Cart Quantity: ${quantity}`);
    return quantity;
  }


    // ==== PRICE VALIDATION ====
    async validatingPrice() {
        const gokwikIframe = this.page.frameLocator('#gokwik-iframe');
        const checkoutButton = this.page.locator(
            'div[data-testid="cart-drawer"] button.checkout-btn.bg-background-primary.text-white.border-none.rounded-10.mb-1\\.5.p-2\\.5.text-base.font-semibold.cursor-pointer.w-full.transition-colors.hover\\:opacity-90.flex.items-center.justify-center.gap-2'
        );
        const summaryHeader = gokwikIframe.locator('div.order-summary-header.svelte-pihlwv');
        const summaryPrice = gokwikIframe.locator('div.bg-white.flex.justify-between.items-center.pt-3.svelte-pihlwv span.text-md.font-semibold.svelte-pihlwv');
        const summaryCloseButton = gokwikIframe.locator('button.close-button.p-3.svelte-1rxsdbg');

        await checkoutButton.click();
        await this.page.waitForTimeout(1000);

        await gokwikIframe.locator('div[id="gokwik-modal-wrapper"]').waitFor({ state: 'hidden' });
        await gokwikIframe.locator('div[class="loading-screen.false.false.svelte-1s1d87u"]').waitFor({ state: 'hidden' });

        await expect(gokwikIframe.locator('body')).toBeVisible({ timeout: 10000 });
        await expect(summaryHeader).toBeVisible({ timeout: 10000 });

        await summaryHeader.click();
        await summaryPrice.waitFor({ state: 'visible', timeout: 15000 });
        const innerPrice = await summaryPrice.innerText();
        await summaryCloseButton.click();
        return innerPrice;
    }

    async outerPrice() {
        const cartPriceOuter = this.page.locator(
            'div[data-testid="cart-drawer"] div[class="theme-box cart-summary bg-white !px-5 !py-[5px]"] p[class="text-18 text-bs-body-color font-semibold leading-normal mb-0"]'
        );
        return await cartPriceOuter.textContent();
    }

    async checkoutFlow(user, phoneNumber) {
        const outerPrice = await this.outerPrice();
        const innerPrice = await this.validatingPrice();

        console.log('Inner Price:', innerPrice);
        console.log('Outer Price:', outerPrice);

        // Example: uncomment for actual comparison
        // await expect(Number(innerPrice.replace(/[^0-9]/g, ''))).toBe(Number(outerPrice.replace(/[^0-9]/g, '')));

        // Optional flow for new user login
        // if (user === "new") {
        //     const loginIframe = this.page.frameLocator('#iframe-kp');
        //     const phoneInput = loginIframe.locator('input#phone-input');
        //     await phoneInput.fill(phoneNumber);
        //     await expect(loginIframe.locator('div.wrap.svelte-ksui44')).toBeVisible({ timeout: 10000 });
        //     const otpInput = loginIframe.locator('input[autocomplete="one-time-code"]');
        //     await otpInput.fill("1212");
        // }
    }


    
}
