const elementUtil = require('../utils/elementUtil.js');
const homePagePO = require('../pageobjects/HomePagePO.js');
const signUpAndLoginPO = require('../pageobjects/SignUpAndLoginPO.js');
const signUpData = require('../datafactory/SignUpData.js');
const constants = require('../constants.js')

describe("Verify login functionality", function(){
    it("Verify that the user is able to login successfully",async()=>{
        const loginData = signUpData.getSignUpData();
        await homePagePO.clickOnHeaderMenu(constants.headerMenuSignUpLogin);
        await expect(await elementUtil.getText(signUpAndLoginPO.loginText)).to.equal(constants.loginText);
        await signUpAndLoginPO.enterLoginDetails(loginData.email,loginData.password);
        await expect(await elementUtil.getText(homePagePO.loggedInText)).to.equal(`Logged in as ${loginData.name}`);
        await elementUtil.click(homePagePO.logoutButton);
        await expect(await elementUtil.isDisplayed(await homePagePO.headerMenu(constants.headerMenuSignUpLogin))).to.equal(true);
    });
})