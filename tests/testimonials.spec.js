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
  
  test('Testimonial 1', async()=>{
    homepage.verifyTestimonialPresence(data.firsttesti,data.firsttestiheading)
    await expect.toHaveText('Rohit Chauhan')
    await expect.toHaveText('physical appearence')


    
  })

})