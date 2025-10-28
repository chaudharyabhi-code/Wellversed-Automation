import data from "../../data/Urls.json" assert { type: "json" };
import { Homepage } from "../homepage";
import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    // ==== NAVIGATION ====
    async navigateToLoginPage() {
        const homepage = new Homepage(this.page);
        await homepage.navigateToPage(data.BASE_URL);

        const profileIcon = this.page.locator('//div[@aria-label="Profile"]//span[text()="Profile"]');
        const loginButton = this.page.locator('div[data-testid="header-desktop-profile-button"] button#login[data-test-id="login-button"]');

        await profileIcon.hover();
        await this.page.waitForTimeout(1000);
        await loginButton.dblclick({ force: true });
    }

    // ==== PHONE INPUT ====
    async enterMobileNumber(phoneNumber) {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const phoneInput = loginIframe.locator('input#phone-input');
        await phoneInput.fill(phoneNumber);
    }

    async verifyInvalidNumberFlow(phoneNumber) {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const errorMsg = loginIframe.locator('p.error.svelte-xz3g4v');

        await this.enterMobileNumber(phoneNumber);
        await expect(errorMsg).toHaveText('Kindly enter a valid mobile number.');
    }


    // ==== UTILITY METHODS ====
async getIframe(frameSelector) {
    const iframeLocator = this.page.locator(frameSelector);
    await expect(iframeLocator).toBeVisible({ timeout: 10000 });
    return this.page.frameLocator(frameSelector);
}


    // ==== OTP FLOW ====
    async verifyOTPPage() {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const otpContainer = loginIframe.locator('div.gokwik-otp-container');
        const verifyButton = loginIframe.locator('button#submit-button');

        await expect(otpContainer).toBeVisible({ timeout: 5000 });
        await expect(verifyButton).toHaveAttribute('disabled');
    }

    async fillOtpFields() {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const otpContainer = loginIframe.locator('div.gokwik-otp-container');
        const otpInputFields = loginIframe.locator('div.input-wrapper.svelte-7cy43c > input.ap-otp-input.svelte-7cy43c');

        await expect(otpContainer).toBeVisible({ timeout: 5000 });
        const otpCount = await otpInputFields.count();

        for (let i = 0; i < otpCount; i++) {
            await otpInputFields.nth(i).fill(i % 2 === 0 ? '1' : '2');
        }
    }

    async verifyingCloseButtonFunctionality() {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const closeButton = loginIframe.locator('button#desktop_close_button');
        const iframeContainer = this.page.locator('#iframe-kp');

        await closeButton.click();
        await expect(iframeContainer).toHaveClass(/hidden/, { timeout: 3000 });
    }

    async verifySuccessfulLogin() {
        const loginIframe = this.page.frameLocator('#iframe-kp');
        const welcomeText = loginIframe.locator('div.ff.kwikpass-welcome.marginTop-0.svelte-1r1tmpc');
        const loader = loginIframe.locator('div[class="loader-container svelte-1be9ixa"]');

        await expect(welcomeText).toBeVisible({ timeout: 5000 });
        await expect(welcomeText).toContainText('Congratulations!You have successfully signed in');
        await loader.waitFor({ state: 'hidden' });
    }

   


}
