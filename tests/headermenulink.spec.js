import { test, expect } from '@playwright/test';
import { Homepage } from '../src/pages/homepage';
import data from '../src/data/HeaderMenuData.json' assert { type: 'json' }
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


  //SHOP BY CATEGORY
  // All Product Category Items
  test('Creatine Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.creatinelink);

    await homepage.verifyURL(/.*\/collections\/creatine/);

    await homepage.verifyThePageHeading("Creatine Monohydrate")
    
  });

  test('Omega Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.omegalink);

    await homepage.verifyURL(/.*\/collections\/omega-3-capsules/);

    await homepage.verifyThePageHeading("Omega 3 Fish Oil Capsules")
  });

  test('Shilajit Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.shilajitlink);

    await homepage.verifyURL(/.*\/collections\/shilajit/);

    await homepage.verifyThePageHeading("Shilajit Resin");
  });

  test('Pre-Workout Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.preworkoutlink);

    await homepage.verifyURL(/.*\/collections\/pre-workout/);

    await homepage.verifyThePageHeading("Pre-Workout");
  });

  test('Sugar Substitute Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.sugarsubstitutelink);

    await homepage.verifyURL(/.*\/collections\/sugar-substitute/);

    await homepage.verifyThePageHeading("Sugar Substitutes");
  });

  test('Electrolytes Link', async () => {
    await homepage.navigateCategory(data.productcategory, data.electrolyteslink);

    await homepage.verifyURL(/.*\/collections\/electrolytes/);

    await homepage.verifyThePageHeading("Electrolytes")
  });

  //All Wellness Category Items
  test('Strength Link', async () => {
    await homepage.navigateCategory(data.wellnesscategory, data.strengthlink);

    await homepage.verifyURL(/.*\/collections\/strength/);

    await homepage.verifyThePageHeading("Strength")
  });

  test('Weight Management Link', async () => {
    await homepage.navigateCategory(data.wellnesscategory, data.weightmanagementlink);

    await homepage.verifyURL(/.*\/collections\/weight-management/);

    await homepage.verifyThePageHeading("Weight Management")

  });

  test('General Fitness Link', async () => {
    await homepage.navigateCategory(data.wellnesscategory, data.generalfitnesslink);

    await homepage.verifyURL(/.*\/collections\/general-fitness/);

    await homepage.verifyThePageHeading("General Fitness")
  });

  test('Blood Sugar Management Link', async () => {
    await homepage.navigateCategory(data.wellnesscategory, data.bloodsugarmanagementlink);

    await homepage.verifyURL(/.*\/collections\/blood-sugar-management/);

    await homepage.verifyThePageHeading("Blood Sugar Management")
  });

  test('Physical Performance Link', async () => {
    await homepage.navigateCategory(data.wellnesscategory, data.physicalperformancelink);

    await homepage.verifyURL(/.*\/collections\/physical-performance/);

    await homepage.verifyThePageHeading("Physical Performance")
  });

  //BRANDS CATEGORY

  test('Wellcore Brand', async ()=>{
    await homepage.navigateBrands(data.wellcore);

    await homepage.verifyURL(/.*\/collections\/wellcore/);

    await homepage.verifyThePageHeading("Wellcore")
  });

  test('Dynamite Brand', async ()=>{
    await homepage.navigateBrands(data.dynamite);

    await homepage.verifyURL(/.*\/collections\/dynamite/);

    await homepage.verifyThePageHeading("Dynamite")
  });

  test('Okami Brand', async ()=>{
    await homepage.navigateBrands(data.okami);

    await homepage.verifyURL(/.*\/collections\/shilajit/);

    await homepage.verifyThePageHeading("Shilajit Resin")
  });

  test('Youwefit Brand', async ()=>{
    await homepage.navigateBrands(data.youwefit);

    await homepage.verifyURL(/.*\/collections\/youwefit/);

    await homepage.verifyThePageHeading("YouWeFit")
  });

  test('Zero Sugar Brand', async ()=>{
    await homepage.navigateBrands(data.zerosugar);

    await homepage.verifyURL(/.*\/collections\/zero-sugar/);

    await homepage.verifyThePageHeading("Zero Sugar")
  });

  //HEADER MENU LINKS
  test('Bestseller', async ()=>{
    await homepage.navigateHeaderMenuLink(data.bestseller);

    await homepage.verifyURL(/.*\/collections\/best-sellers/);

    await homepage.verifyThePageHeading("Best Sellers")
  });

  test('Deals', async ()=>{
    await homepage.navigateHeaderMenuLink(data.deals);

    await homepage.verifyURL(/.*\/collections\/deals-discount/);

    await homepage.verifyThePageHeading("Deals & Discounts")

  });

  test('Blogs', async ()=>{
    await homepage.navigateHeaderMenuLink(data.blogs);

    await homepage.verifyURL("https://wellversed.in/blogs/articles");
  });

  test('Authenticator', async ()=>{
    await homepage.navigateHeaderMenuLink(data.authenticator);

    await homepage.verifyURL("https://wellversed.in/pages/authenticator");
  });

  test('Track Your Order', async ()=>{
    await homepage.navigateHeaderMenuLink(data.trackyourorder);

    await homepage.verifyURL("https://wellversed.clickpost.ai/");
  });

  test('Customer Support', async ()=>{
    await homepage.navigateHeaderMenuLink(data.customersupport);

    await homepage.verifyURL("https://wellversed.in/pages/customer-support");
  });

  test('About Us', async ()=>{
    await homepage.navigateHeaderMenuLink(data.aboutus);

    await homepage.verifyURL("https://wellversed.in/pages/about-us");
  });

  test('Bulk Enquiries', async ()=>{
    await homepage.navigateHeaderMenuLink(data.bulkenquires);

    await homepage.verifyURL("https://wellversed.in/pages/bulk-enquiries");
  });

});