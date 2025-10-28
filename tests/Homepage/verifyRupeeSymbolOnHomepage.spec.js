import {test} from "@playwright/test";
import { Homepage } from "../../src/pages/homepage";
import { verifyRupeeSymbolOnHomepage } from "../../src/pages/verifyRupeeSymbolOnHomepage";
import data from "../../src/data/Urls.json"

test.describe(("Verifying the Rupee Symbol on Homepage"),()=>{
    let rupeeSymbol;
    let homepage;
  test.beforeEach(async ({ page }) => { 
        homepage = new Homepage(page);
       
           await homepage.navigateToPage(data.BASE_URL);

        rupeeSymbol=new verifyRupeeSymbolOnHomepage(page);

    })

   test("verifying for best seller section",async ({page})=>{
    await rupeeSymbol.verifyRupeeSymbol("Best Sellers");

   })
   test("verifying for Fitness Combo section",async ({page})=>{
    await rupeeSymbol.verifyRupeeSymbol("Fitness Combo");

   }) 
    test("verifying for Blood Sugar Management section",async ({page})=>{
    await rupeeSymbol.verifyRupeeSymbol("Blood Sugar Management");

   })

})
