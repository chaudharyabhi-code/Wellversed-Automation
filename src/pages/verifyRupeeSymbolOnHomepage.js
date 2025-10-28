    import { expect } from '@playwright/test';

    export class verifyRupeeSymbolOnHomepage {
        constructor(page) {
            this.page = page;
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
