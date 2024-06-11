const elementUtil = require('../utils/elementUtil.js');
const shoppingCartPO = require('../pageobjects/ShoppingCartPO.js');
const signUpAndLoginPO = require('../pageobjects/SignUpAndLoginPO.js');
const homePagePO = require('../pageobjects/HomePagePO.js');
const checkoutPO = require('../pageobjects/CheckoutPO.js');
const paymentPO = require('../pageobjects/PaymentPO.js');
const accountInfoPO = require('../pageobjects/AccountInfoPO.js');
const signUpData = require('../datafactory/SignUpData.js');
const constants = require('../constants.js');
const fs = require('fs');
const loginData = signUpData.getSignUpData();

describe("Verify Order a product functionality", function(){
      const productName = "Fancy Green Top";

   it("Verify that the user is able to add product into cart",async()=>{
      
       await homePagePO.moveAndClickOnProduct(productName);
       await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
       await elementUtil.click(homePagePO.viewCartLink);

       await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
       const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
       const isStringPresent = productNameList.includes(productName);
       await expect(isStringPresent).to.equal(true);
   });

   it("Verify that the user is able to delete product from cart ",async()=>{
      
        await homePagePO.moveAndClickOnProduct(productName);
        await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
        await elementUtil.click(homePagePO.viewCartLink);

        await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
        const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
        const isStringPresent = productNameList.includes(productName);
        await expect(isStringPresent).to.equal(true);
        await shoppingCartPO.clickOnDeleteByProductname(productName);
        await expect(await elementUtil.getText(await shoppingCartPO.emptyCartText)).to.equal(constants.emptyCartText);
   });

   it("Verify that the user is able to place the order successfully when logging in during the checkout process",async()=>{
      
        await homePagePO.moveAndClickOnProduct(productName);
        await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
        await elementUtil.click(homePagePO.viewCartLink);

        await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
        const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
        const isStringPresent = productNameList.includes(productName);
        await expect(isStringPresent).to.equal(true);
        await elementUtil.click(await shoppingCartPO.proceedButton);

        await expect(await elementUtil.getText(await shoppingCartPO.checkoutMessage)).to.equal(constants.checkoutMessage);
        await elementUtil.click(await shoppingCartPO.registerLoginLink);
        await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
        await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);

        await homePagePO.clickOnHeaderMenu(constants.headerMenuCart);
        await elementUtil.click(await shoppingCartPO.proceedButton);

        await expect(await elementUtil.isDisplayed(await checkoutPO.deliveryAddress)).to.equal(true);
        await expect(await elementUtil.isDisplayed(await checkoutPO.billingAddress)).to.equal(true);
        await expect(await elementUtil.isDisplayed(await checkoutPO.reviewOrderText)).to.equal(true);
        const orderedProductNameList = await checkoutPO.productNameList.map(elem => elem.getText());
        const isProductPresent = orderedProductNameList.includes(productName);
        await expect(isProductPresent).to.equal(true);
        await elementUtil.click(checkoutPO.placeOrderButton);
        await browser.pause(5000);   

        await expect(await elementUtil.getText(await paymentPO.paymentHeading)).to.equal(constants.paymentHeading);
        await paymentPO.enterPaymentDetails();
        await expect(await elementUtil.getText(await paymentPO.orderPlacedText)).to.equal(constants.orderPlacedText);
        await expect(await elementUtil.getText(await paymentPO.confirmedText)).to.equal(constants.orderConfirmedText);
        await elementUtil.click(await paymentPO.continueButton);
        await expect(await browser.getTitle()).to.equal(constants.homePageTitle);
        await elementUtil.click(homePagePO.logoutButton);
   });

   it("Verify that the user is able to place the order successfully and download the invoice",async()=>{
        
         await homePagePO.moveAndClickOnProduct(productName);
         await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
         await elementUtil.click(homePagePO.viewCartLink);

         await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
         const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
         const isStringPresent = productNameList.includes(productName);
         await expect(isStringPresent).to.equal(true);
         await elementUtil.click(await shoppingCartPO.proceedButton);

         await expect(await elementUtil.getText(await shoppingCartPO.checkoutMessage)).to.equal(constants.checkoutMessage);
         await elementUtil.click(await shoppingCartPO.registerLoginLink);
         await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
         await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);
         await homePagePO.clickOnHeaderMenu(constants.headerMenuCart);
         await elementUtil.click(await shoppingCartPO.proceedButton);

         await expect(await elementUtil.isDisplayed(await checkoutPO.deliveryAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.billingAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.reviewOrderText)).to.equal(true);
         const orderedProductNameList = await checkoutPO.productNameList.map(elem => elem.getText());
         const isProductPresent = orderedProductNameList.includes(productName);
         await expect(isProductPresent).to.equal(true);
         await elementUtil.click(checkoutPO.placeOrderButton);

         await expect(await elementUtil.getText(await paymentPO.paymentHeading)).to.equal(constants.paymentHeading);
         await paymentPO.enterPaymentDetails();
         await expect(await elementUtil.getText(await paymentPO.orderPlacedText)).to.equal(constants.orderPlacedText);
         await expect(await elementUtil.getText(await paymentPO.confirmedText)).to.equal(constants.orderConfirmedText);
         await elementUtil.click(paymentPO.downloadInvoiceButton);
         await elementUtil.click(homePagePO.logoutButton);

         const fileExists = fs.existsSync("C:\\Users\\gunjan\\Downloads\\invoice.txt");
         await expect(fileExists).to.equal(true);
   });

   it.only("Verify that the user is able to place the order successfully when register in during the checkout process",async()=>{
         
         await homePagePO.moveAndClickOnProduct(productName);
         await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
         await elementUtil.click(homePagePO.viewCartLink);

         await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
         const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
         const isStringPresent = productNameList.includes(productName);
         await expect(isStringPresent).to.equal(true);
         await elementUtil.click(await shoppingCartPO.proceedButton);

         await expect(await elementUtil.getText(await shoppingCartPO.checkoutMessage)).to.equal(constants.checkoutMessage);
         await elementUtil.click(await shoppingCartPO.registerLoginLink);
         await expect(await elementUtil.getText(signUpAndLoginPO.signUpText)).to.equal(constants.signUpText);
         await signUpAndLoginPO.enterSignUpdetails(loginData.name,loginData.email);
         await accountInfoPO.enterAccountDetails();
         await expect(await elementUtil.getText(accountInfoPO.accountCreatedText)).to.equal(constants.accountCreatedText);
         await expect(await elementUtil.getText(accountInfoPO.accountCreatedSuccessMessage)).to.equal(constants.accountCreatedSuccessMessage);
         await homePagePO.clickOnHeaderMenu(constants.headerMenuCart);
         await elementUtil.click(await shoppingCartPO.proceedButton);

         await expect(await elementUtil.isDisplayed(await checkoutPO.deliveryAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.billingAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.reviewOrderText)).to.equal(true);
         const orderedProductNameList = await checkoutPO.productNameList.map(elem => elem.getText());
         const isProductPresent = orderedProductNameList.includes(productName);
         await expect(isProductPresent).to.equal(true);
         await elementUtil.click(checkoutPO.placeOrderButton);

         await expect(await elementUtil.getText(await paymentPO.paymentHeading)).to.equal(constants.paymentHeading);
         await paymentPO.enterPaymentDetails();
         await expect(await elementUtil.getText(await paymentPO.orderPlacedText)).to.equal(constants.orderPlacedText);
         await expect(await elementUtil.getText(await paymentPO.confirmedText)).to.equal(constants.orderConfirmedText);
         await elementUtil.click(homePagePO.logoutButton);
   });

   it("Verify that the user is able to place the order successfully while already logged in",async()=>{
        
         await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
         await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
         await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);
         await expect(await elementUtil.getText(homePagePO.loggedInText)).to.equal(`Logged in as ${loginData.name}`);
         await homePagePO.moveAndClickOnProduct(productName);
         await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
         await elementUtil.click(homePagePO.viewCartLink);

         await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
         const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
         const isStringPresent = productNameList.includes(productName);
         await expect(isStringPresent).to.equal(true);
         await elementUtil.click(await shoppingCartPO.proceedButton);

         await expect(await elementUtil.isDisplayed(await checkoutPO.deliveryAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.billingAddress)).to.equal(true);
         await expect(await elementUtil.isDisplayed(await checkoutPO.reviewOrderText)).to.equal(true);
         const orderedProductNameList = await checkoutPO.productNameList.map(elem => elem.getText());
         const isProductPresent = orderedProductNameList.includes(productName);
         await expect(isProductPresent).to.equal(true);
         await elementUtil.click(checkoutPO.placeOrderButton);
      
         await browser.pause(3000);
         await expect(await elementUtil.getText(await paymentPO.paymentHeading)).to.equal(constants.paymentHeading);
         await paymentPO.enterPaymentDetails();
         await expect(await elementUtil.getText(await paymentPO.orderPlacedText)).to.equal(constants.orderPlacedText);
         await expect(await elementUtil.getText(await paymentPO.confirmedText)).to.equal(constants.orderConfirmedText);
         await elementUtil.click(await paymentPO.continueButton);
         await expect(await browser.getTitle()).to.equal(constants.homePageTitle);
         await elementUtil.click(homePagePO.logoutButton);
   });

   it("Verify that the added products are displayed in the carts when the user logout and login again in same browser.",async()=>{
         const productName1 = "Fancy Green Top";
         const productName2 = "Winter Top";
         
         await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
         await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
         await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);
         await expect(await elementUtil.getText(homePagePO.loggedInText)).to.equal(`Logged in as ${loginData.name}`);
         
         await homePagePO.moveAndClickOnProduct(productName1);
         await expect(await elementUtil.getText(await homePagePO.addedMessage)).to.equal(constants.productAddedMessage);
         await elementUtil.click(homePagePO.continueShoppingButton);

         await homePagePO.moveAndClickOnProduct(productName2);
         await elementUtil.click(homePagePO.viewCartLink);
         await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
         const productNameList = await shoppingCartPO.productNameList.map(elem => elem.getText());
         const expectedProductNames = [productName1,productName2];
         const areAllStringsPresent = expectedProductNames.every(productName => productNameList.includes(productName));
         await expect(areAllStringsPresent).to.equal(true);
         await elementUtil.click(homePagePO.logoutButton);

         await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
         await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
         await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);
         await expect(await elementUtil.getText(homePagePO.loggedInText)).to.equal(`Logged in as ${loginData.name}`);
         await homePagePO.clickOnHeaderMenu(constants.headerMenuCart);

         await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
         const productNameListInCart = await shoppingCartPO.productNameList.map(elem => elem.getText());
         const productPresent = expectedProductNames.every(productName => productNameListInCart.includes(productName));
         await expect(productPresent).to.equal(true);
         await elementUtil.click(homePagePO.logoutButton);
   });

});