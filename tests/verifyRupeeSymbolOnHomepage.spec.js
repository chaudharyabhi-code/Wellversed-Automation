import {test} from "@playwright/test";
import { Homepage } from "../src/pages/homepage";
import data from "../src/data/Urls.json"

test.describe(("Verifying the Rupee Symbol on Homepage"),()=>{
    let rupeeSymbol;
    let homepage;
  test.beforeEach(async ({ page }) => { 
        homepage = new Homepage(page);
       
           await homepage.navigateToPage(data.BASE_URL);


    })

   test("verifying for best seller section",async ({page})=>{
    await homepage.verifyRupeeSymbol("Best Sellers");

   })
   test("verifying for Fitness Combo section",async ({page})=>{
    await homepage.verifyRupeeSymbol("Fitness Combo");

   }) 
    test("verifying for Blood Sugar Management section",async ({page})=>{
    await homepage.verifyRupeeSymbol("Blood Sugar Management");

   })

})
