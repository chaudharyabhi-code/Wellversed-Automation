// import { test, expect } from '@playwright/test';
// import { Productpage } from '../pages/productpage';
// import { Homepage } from '../pages/homepage';
// import proddata from '../data/ProductpageData.json' assert { type: 'json' }
// import data from '../data/HeaderMenuData.json' assert { type: 'json' }

// let productpage;
// let page;
// let context;
// let homepage;

// test.describe('Verify Filter & Sort By', () => {
//   test.beforeEach(async ({ browser }) => { 
//     context= await browser.newContext(); 
//     page = await context.newPage();
//     productpage = new Productpage(page);
//     homepage = new Homepage(page);

//     //Go to Home page
//     await homepage.navigateToPage('https://wellversed-dev-custom.primathontech.co.in/');
//   });

//   test.afterEach(async () => {
//     // Close the page and context after each test
//     await page.close();
//     await context.close();
//   });

//   test( 'In Stock', async()=>{
//     await homepage.navigateCategory(data.productcategory, data.creatinelink);

//     await productpage.filter(proddata.stockcheckboxnumber);

//     await productpage.getCount(proddata.filterinstock,proddata.productcardinstock);

//   });

// });