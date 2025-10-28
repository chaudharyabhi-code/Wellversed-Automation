// import { test, expect } from "@playwright/test";
// import { LoginPage } from "../../src/pages/LoginPage/loginPage";
// import { Homepage } from "../../src/pages/homepage";
// import productData from "../../src/data/ProductDetail.json";
// import loginData from "../../src/data/LoginPageData.json";
// import urls from "../../src/data/Urls.json";

// test.describe("E-commerce Positive Flow → Login → Search Product → Checkout", () => {
//   let login;

//   test.beforeEach(async ({ page }) => {
//     login = new LoginPage(page);
//     await login.navigateToLoginPage();
//   });

//   test("User can log in and complete checkout successfully", async ({ page }) => {
//     //  Step 1: Get iframe dynamically
//     const iframe = await login.getIframe("#iframe-kp");

//     //  Step 2: Enter mobile number
//     await login.enterMobileNumber(loginData.validNumber, iframe);

//     //  Step 3: Fill OTP and verify success
//     await login.fillOtpFields(iframe);
//     await login.verifySuccessfulLogin(iframe);

//      await productDetailPage.searchProduct(productData.productName);
//         await   productDetailPage.enterProductPage()  
//         await  productDetailPage.clickAddToCartButton();

//     // Step 6: Validate checkout flow
//     await login.checkoutFlow();
//   });
// });
