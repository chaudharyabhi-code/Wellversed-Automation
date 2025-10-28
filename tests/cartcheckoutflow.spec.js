import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage';
import data from '../src/data/HomepageData.json' assert { type: 'json' }
import headerdata from '../src/data/HeaderMenuData.json' assert {type:'json'}
let homepage;
let page;
let context;

test.describe('Verify All Links On The Header Menu', () => {
  test.beforeEach(async ({ browser }) => { 
    context= await browser.newContext(); 
    page = await context.newPage();
    homepage = new Homepage(page);

    //Go to Home page
    await homepage.navigateToPage('https://wellversed-dev-custom.primathontech.co.in/');
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });

  test('Cart from Bestseller with coupon clicking', async () =>{
    await homepage.navigateHeaderMenuLink(headerdata.bestseller);
    await homepage.addToCart(data.Creatine120gm);
    await homepage.goToCart();
    await expect.toHaveText(data.Creatine120gm)
    await expect.toHaveTitle(data.Creatine120gm);
    await homepage.applyCoupon(data.viewalloffers,data.well10);


  })

})