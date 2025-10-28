// import { test } from "@playwright/test";
// import { Homepage } from "../../src/pages/homepage";
// import data from "../../src/data/LoginPageData.json";
// import { LoginPage } from "../../src/pages/LoginPage/loginPage";

// test.describe("Login Page", () => {
//     let login;

//     test.beforeEach(async ({ page }) => {
//         login = new LoginPage(page);
        
//         await login.navigateToLoginPage();
//     });
    
//     test("invalid number", async ({ page }) => {
//         await login.verifyInvalidNumberFlow(data.inValidNumber);
//     });
    
//     test("verifying OTP page", async ({ page }) => {
        
//         const iframe = await login.getIframe();
//         await login.enterNumber(data.validNumber, iframe);
//         await login.verifyOTPPage();
//     });

//     test("verifying close button leads to closing of iframe", async ({ page }) => {
//     await login.navigateToLoginPage();

//     const iframe = await login.getIframe();
//     await login.verifyingCloseButtonFunctionality(iframe);
// });

// });
