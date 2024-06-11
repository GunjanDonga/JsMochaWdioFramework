const elementUtil = require('../utils/elementUtil');
class HomePagePO{

    get loggedInText(){
        return $("//li[10]//a[1]");
    }
    
    get logoutButton(){
        return $("//a[text()=' Logout']");
    }

    get viewProductButton(){
        return $("(//i[@class='fa fa-plus-square']/parent::a)[1]");
    }

    get viewCartLink(){
        return $("//u[text()='View Cart']");
    }

    get continueShoppingButton(){
        return $('.modal-footer button');
    }

    get susbscribeTextBox(){
        return $("#susbscribe_email");
    }

    get successAlertMessage(){
        return $(".alert-success");
    }

    get susbscribeButton(){
        return $(".fa-arrow-circle-o-right");
    }

    get addedMessage(){
        return $(".modal-body p:nth-child(1)");
    }

    get womenCategory(){
        return $("(//i[@class='fa fa-plus'])[1]");
    }

    get womenDress(){
        return $("(//div[@id='Women']//a)[1]");
    }

    get allProductNamelist(){
        return $$(".productinfo p");
    }

    get womenDressLabel(){
        return $$("h2.title");
    }

    async headerMenu(menuName){
        return await $("//ul[@class='nav navbar-nav']//a[contains(text(),'"+menuName+"')]");
    }

    async clickOnHeaderMenu(headerMenu){
        await elementUtil.click(await this.headerMenu(headerMenu));
    }

    async moveAndClickOnProduct(name){
        const product = $("(//p[text()='"+name+"'])[1]");
        const addToCartBtn = $("//div[@class ='overlay-content']/p[text()='"+name+"']/following-sibling::a");
        await elementUtil.moveToElement(product);
        await browser.scroll(0, -300);
        await elementUtil.moveToElement(product);
        await elementUtil.click(addToCartBtn);
    }

    async clickOnViewProductButton(productName){
        await elementUtil.click($("//p[text()='"+productName+"']/ancestor::div[@class='single-products']/following-sibling::div//i"));
    }

    async getProductPriceByName(productName){
        const price = $("(//p[text()='"+productName+"'])[1]/preceding-sibling::h2");
        return elementUtil.getText(await price); //await (await price).getText();
    }

}
module.exports = new HomePagePO();