import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage';
import data from '../src/data/HomepageData.json' assert { type: 'json' }
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


  //Verify View More
  test('Best Seller CTA',async()=>{
    await homepage.verifyCTA(data.bestsellerCTA);

    await homepage.verifyURL(/.*\/collections\/best-sellers/);
  })

  test('Fitness Combo CTA',async()=>{
    await homepage.verifyCTA(data.fitnesscomboCTA);

    await homepage.verifyURL(/.*\/collections\/fitness-combo/);
  })

  test('Blood Sugar Management CTA',async()=>{
    await homepage.verifyCTA(data.bloodsugarmanagementCTA);

    await homepage.verifyURL(/.*\/collections\/keto/);
  })

  //Read More Action
  test('Read More CTA',async()=>{
    await homepage.readMore();

    await expect.toHaveText('Wellversed: Your Trusted Online Sports Supplement Store in India');
  })

  test('Show Less CTA',async()=>{
    await homepage.readMore();
    await homepage.showLess();
    await homepage.readMore();
    await expect.toHaveText('Show Less');  })


})