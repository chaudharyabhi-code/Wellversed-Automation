import { test } from "@playwright/test";
import data from "../../src/data/Urls.json";
import { Homepage } from "../../src/pages/homepage";

test.describe(" Verify WhatsApp logo redirects user correctly", () => {
    let homepage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await homepage.navigateToPage(data.BASE_URL);
    });

    test("Verify", async ({ page }) => {
        await homepage.verifyRedirection();
    });
});
