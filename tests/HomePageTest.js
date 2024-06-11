const { expect } = require('chai');
const homePagePO = require('../pageobjects/HomePagePO.js');
const elementUtil = require('../utils/elementUtil.js');
const productPagePO = require('../pageobjects/ProductPagePO.js');
const signUpData = require('../datafactory/SignUpData.js');
const loginData = signUpData.getSignUpData();
const constants = require('../constants.js');
const { remote } = require('webdriverio'); 

describe("Verify product category", function(){

  beforeEach(async () => {
     await browser.url('/');
     await browser.pause(2000);
     expect(await browser.getTitle()).to.equal(constants.homePageTitle);
  });

  it("Verify that the related products are displayed when the user change the category.",async()=>{
     await elementUtil.click(homePagePO.womenCategory);
     await elementUtil.click(homePagePO.womenDress);
     await browser.pause(3000);
     const productNameList = await homePagePO.allProductNamelist.map(elem => elem.getText()); 
     const results = productNameList.map(item => item.includes('Dress'));
     const allTrue = results.every(value => value === true);
     await expect(allTrue).to.equal(true);
   });

  it("Verify that subscription successful message is displayed.",async()=>{
     await elementUtil.setValue(await homePagePO.susbscribeTextBox,loginData.email);
     await elementUtil.click(await homePagePO.susbscribeButton);
     await expect(await elementUtil.getText(await homePagePO.successAlertMessage)).to.equal(constants.subscriptionSuccessfulMessage);
   });

  it("Verify that the searched results are displayed.",async()=>{
     await homePagePO.clickOnHeaderMenu(constants.headerMenuProducts);
     await expect(await elementUtil.getText(await productPagePO.allProductLabel)).to.equal(constants.allProductLabel);
     await elementUtil.setValue(await productPagePO.searchProductTextBox,"Top");
     await elementUtil.click(await productPagePO.searchProductButton);
     await expect(await elementUtil.getText(await productPagePO.allProductLabel)).to.equal(constants.searchedProductLabel);
     const productNameList = await productPagePO.allProductNamelist.map(el => el.getText());
     console.log("productNameList",productNameList);
     const isStringPresent = productNameList.map(el=>el.includes("Top"));
     console.log("isStringPresent",isStringPresent);
     await expect(isStringPresent.every(el=>el===true),'Not all elements are true').to.equal(true);
  });
})