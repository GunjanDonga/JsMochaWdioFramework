const elementUtil = require('../utils/elementUtil.js');
const homePagePO = require('../pageobjects/HomePagePO.js');
const signUpAndLoginPO = require('../pageobjects/SignUpAndLoginPO.js');
const accountInfoPO = require('../pageobjects/AccountInfoPO.js');
const SignUpData = require('../datafactory/SignUpData.js');
const constants = require('../constants.js');
const userData = SignUpData.getSignUpData();

describe("Verify register functionality", function(){

    it("Verify that the user is able to register successfully",async()=>{
       await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
       await expect(await elementUtil.getText(signUpAndLoginPO.signUpText)).to.equal(constants.signUpText);
       await signUpAndLoginPO.enterSignUpdetails(userData.name,userData.email);
       await accountInfoPO.enterAccountDetails();
       await expect(await elementUtil.getText(accountInfoPO.accountCreatedText)).to.equal(constants.accountCreatedText);
       await expect(await elementUtil.getText(accountInfoPO.accountCreatedSuccessMessage)).to.equal(constants.accountCreatedSuccessMessage);
       await homePagePO.clickOnHeaderMenu(constants.headerMenuHome);
       await expect(await elementUtil.getText(homePagePO.loggedInText)).to.equal(`Logged in as ${userData.name}`);
       await elementUtil.click(homePagePO.logoutButton);
    });

    it("Verify that the user is not register while using already registered email id",async()=>{
       await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
       await expect(await elementUtil.getText(signUpAndLoginPO.signUpText)).to.equal(constants.signUpText);
       await signUpAndLoginPO.enterSignUpdetails(userData.name,userData.email);
       await expect(await elementUtil.getText(signUpAndLoginPO.signUpErrorText)).to.equal(constants.signUpErrorText);
     });
});