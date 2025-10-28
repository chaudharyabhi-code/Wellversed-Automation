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

  test('Dynamite Banner',async()=>{
    await homepage.mainBannerCTA(data.dynamitemainbanner);

    await homepage.verifyURL(/.*\/products\/dynamite-pre-workout-caffeine-free-195g-15-servs-green-apple/);
  })

  test('Shilajit Banner',async()=>{
    await homepage.mainBannerCTA(data.shilajitmainbanner);
    
    await homepage.verifyURL(/.*\/collections\/shilajit/);
  })

  test('You We Fit Banner',async()=>{
    await homepage.mainBannerCTA(data.youwefitmainbanner);

    await homepage.verifyURL(/.*\/collections\/omega-3-capsules/);
  })

  test('Creatine Banner',async()=>{
    await homepage.mainBannerCTA(data.creatinemainbanner);

    await homepage.verifyURL(/.*\/products\/wellcore-pure-micronised-creatine-monohydrate-kiwi-kick-122g-33-servings-rapid-absorption-enhanced-muscle-strength-power-fast-recovery-increased-muscle-mass-1/);
  })

  test('New Launch Banner',async()=>{
    await homepage.mainBannerCTA(data.newlaunchmainbanner);

    await homepage.verifyURL(/.*\/collections\/new-arrivals/);
  })

  test('Secondary Banner',async()=>{
    await homepage.secondaryBannerCTA(data.secondarybanner);

    await homepage.verifyURL(/.*\//);
  })


})