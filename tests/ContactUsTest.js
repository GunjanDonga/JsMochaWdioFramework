const elementUtil = require('../utils/elementUtil.js');
const homePagePO = require('../pageobjects/HomePagePO.js');
const contactUsPO = require('../pageobjects/ContactUsPO.js')
const constants = require('../constants.js');

describe("Verify contact us functionality", function(){

    it("Verify that the user is able to submit contact us form successfully",async()=>{
        await homePagePO.clickOnHeaderMenu(constants.contactUsHeaderText);
        await expect(await elementUtil.getText(contactUsPO.getinTouchText)).to.equal(constants.getinTouchText);
        await contactUsPO.enterDetailsInForm();
        console.log(await browser.getAlertText());
        await browser.acceptAlert();
        await expect(await elementUtil.getText(contactUsPO.successMessage)).to.equal(constants.reviewFormSuccessMessage);
    });

    it("Verify that required attribute is present in email tag of review form",async()=>{
        await homePagePO.clickOnHeaderMenu(constants.contactUsHeaderText);
        await expect(await elementUtil.getText(contactUsPO.getinTouchText)).to.equal(constants.getinTouchText);
        const requiredAttribute = await (await contactUsPO.emailTextBox).getAttribute('required');
        const isRequired = requiredAttribute !== null;
        await expect(isRequired).to.be.true;    
    });
})