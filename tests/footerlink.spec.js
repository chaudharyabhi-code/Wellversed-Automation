import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage';
import data from '../src/data/HomepageData.json' assert { type: 'json' }
let homepage;
let page;
let context;

test.describe('Verify All Links On The Footer', () => {
  test.beforeEach(async ({ browser }) => { 
    context= await browser.newContext(); 
    page = await context.newPage();
    homepage = new Homepage(page);

    //Go to Home page
    await homepage.navigateToPage('https://wellversed-dev-custom.primathontech.co.in/');
  });

  test.afterEach(async () => {
    // Close the page and context after each test
    await page.close();
    await context.close();
  });

  //   Footer Links Verification
  test('Terms & Conditions', async()=>{
    await homepage.navigateFooterLinks(data.termsconditionlink)

    await homepage.verifyURL("https://wellversed.in/pages/terms-and-conditions");

  });

  test('Privacy Policy', async()=>{
    await homepage.navigateFooterLinks(data.privacypolicy)

    await homepage.verifyURL("https://wellversed.in/pages/privacy-policy");
  });

  test('Refund Policy', async()=>{
    await homepage.navigateFooterLinks(data.refundpolicy)

    await homepage.verifyURL("https://wellversed.in/pages/refund-policy");
  });

  test('Shipping Policy', async()=>{
    await homepage.navigateFooterLinks(data.shippingpolicy)

    await homepage.verifyURL("https://wellversed.in/pages/shipping-policy");
  });

  test('Become A Partner', async()=>{
    await homepage.navigateFooterLinks(data.becomepartner)

    await homepage.verifyURL("https://wellversed.in/pages/bulk-enquiries");
  });

  test('Authorised Online Sellers', async()=>{
    await homepage.navigateFooterLinks(data.authonlineseller)

    await homepage.verifyURL(/#Authorized$/);

  });

  test('About Us', async()=>{
    await homepage.navigateFooterLinks(data.aboutus)

    await homepage.verifyURL("https://wellversed.in/pages/about-us");
  });

  test('Utopia', async()=>{
    await homepage.navigateFooterLinks(data.utopia)

    await homepage.verifyURL("https://wellversed.in/pages/utopia-2025-the-future-of-human-potential");
  });

  // test.only('Facebook', async ({ context }) => {
  //   const [newPage] = await Promise.all([
  //     context.waitForEvent('page'),                   
  //     homepage.socialMediaCTA(data.facebook),         
  //   ]);
  
  //   await newPage.waitForLoadState('load');            
  //   await homepage.verifyURL("https://www.facebook.com/wellversed.in", newPage); 
  // });

  // test.only('Facebook', async ({ context, page }) => {
  //   const [newPage] = await Promise.all([
  //     context.waitForEvent('page', { timeout: 60000 }),
  //     homepage.socialMediaCTA(data.facebook),
  //   ]);
  
  //   await newPage.waitForLoadState('domcontentloaded');
  //   await newPage.waitForURL(/facebook\.com/, { timeout: 30000 });
  //   await homepage.verifyURL("https://www.facebook.com/wellversed.in", newPage);

  //   context.on('page', p => console.log('>>> New page opened with URL:', p.url()));
  //   page.on('popup', p => console.log('>>> Popup detected with URL:', p.url()));

  // });
  
  // test.only('Facebook - New Tab Navigation', async ({ context, page }) => {
  //   // --- DEBUGGING: Log all page events ---
  //   context.on('page', async (p) => {
  //     console.log('>>> New page opened with URL:', await p.url());
  //   });
  //   page.on('popup', async (p) => {
  //     console.log('>>> Popup detected with URL:', await p.url());
  //   });
  
  //   // --- Step 1: Listen for the new tab BEFORE clicking ---
  //   const newPagePromise = context.waitForEvent('page', { timeout: 15000 });
  
  //   // --- Step 2: Click on Facebook icon (opens new tab) ---
  //   await homepage.socialMediaCTA(data.facebook);
  
  //   // --- Step 3: Wait for the popup tab to appear ---
  //   const newPage = await newPagePromise;
  
  //   // --- Step 4: Wait for the new tab to load completely ---
  //   await newPage.waitForLoadState('domcontentloaded');
  
  //   // --- Step 5: Validate it navigated to Facebook ---
  //   await newPage.waitForURL(/facebook\.com/, { timeout: 30000 });
  
  //   // --- Step 6: Verify expected URL ---
  //   await homepage.verifyURL("https://www.facebook.com/wellversed.in", newPage);
  
  //   console.log('✅ Facebook tab opened successfully at:', await newPage.url());
  // });
  
  
  // // --- Helper function (inside your page object) ---
  // async function verifyURL(expectedURL, page) {
  //   const current = await page.url();
  //   console.log('🔍 Current URL:', current);
  //   expect(current).toContain(expectedURL);
  // }

  // test('Instagram', async()=>{
  //   await homepage.socialMediaCTA(data.instagram)

  //   await homepage.verifyURL("https://www.instagram.com/wellversed.in/");
  // });

});