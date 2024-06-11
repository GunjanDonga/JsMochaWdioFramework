const homePagePO = require('../pageobjects/HomePagePO.js');
const elementUtil = require("../utils/elementUtil");
const productDescriptionPO = require('../pageobjects/ProductDescriptionPO.js');
const constants = require('../constants.js');

describe("Verify Order a product functionality", function(){
    const productName = "Fancy Green Top";

    it("Verify that that successful message is displayed",async()=>{
        await homePagePO.clickOnViewProductButton(productName);
        await productDescriptionPO.enterDataIntoReviewForm();
        await expect(await elementUtil.getText(await productDescriptionPO.successMessage)).to.equal(constants.successMessage);
    });

    it("Verify that the validation message is displayed when the user click on submit button without entering any data into review form.",async()=>{
        await homePagePO.clickOnViewProductButton(productName);
        const requiredAttributeForName = await (await productDescriptionPO.nameTextBox).getAttribute('required');
        const requiredAttributeForEmail = await (await productDescriptionPO.emailTextBox).getAttribute('required');
        const requiredAttributeForReview = await (await productDescriptionPO.reviewTextBox).getAttribute('required');
        await expect(requiredAttributeForName).to.equal('true');
        await expect(requiredAttributeForEmail).to.equal('true');
        await expect(requiredAttributeForReview).to.equal('true');
    });
})