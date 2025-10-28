import { test, expect } from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import { ProductDetailPage } from "../src/pages/productDetailPage";
import { CartPageCheckout } from "../src/pages/cartPageCheckout";
import urls from "../src/data/Urls.json";
import productData from "../src/data/ProductDetail.json";

test.describe("🧪 Verify Product productDetailPage Functionalities", () => {
  let homePage;
  let productDetailPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new Homepage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPageCheckout(page);

    await homePage.navigateToPage(urls.BASE_URL);
    await productDetailPage.searchProduct(productData.productName);
    await productDetailPage.enterProductPage()
     });

    // ✅ Verify Incrementing productDetailPage
    test("Verify Increase Product productDetailPage", async ({ page }) => {
      await productDetailPage.increase(3); // increases by 3
      const finalValue = await productDetailPage.getCurrentValue();
      console.log("✅ Final increased value:", finalValue);
      await expect(finalValue).toBe(4); // assuming initial was 1
    });

    // ✅ Verify Decrementing productDetailPage
    test("Verify Decrease Product productDetailPage", async ({ page }) => {
      // Set high initial value
      await productDetailPage.setQuantity(10);
      await productDetailPage.decrease(3);
      const finalValue = await productDetailPage.getCurrentValue();
      console.log("✅ Final decreased value:", finalValue);
      await expect(finalValue).toBe(7);
    });

    // ✅ Verify PDP → Cart productDetailPage Consistency
    test("Verify selected productDetailPage matches in cart", async ({ page }) => {
      await productDetailPage.increase(2);
      const pdpCount = await productDetailPage.getCurrentValue();
      console.log("🛍️ PDP productDetailPage:", pdpCount);

      await productDetailPage.clickAddToCartButton();
      await productDetailPage.clickShoppingCartButton();

      const cartCount = await cartPage.productQuantityOnCartPage();
      console.log("🛒 Cart productDetailPage:", cartCount);

      await expect(Number(cartCount)).toBe(pdpCount);
    });
  });
