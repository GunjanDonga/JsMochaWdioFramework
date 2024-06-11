const elementUtil = require('../utils/elementUtil');
class ShoppingCartPO{
    get productNameList(){
        return $$(".cart_description a");
    }

    get shoppingCartText(){
        return $("//li[@class='active']");
    }

    get proceedButton(){
        return $("//a[text()='Proceed To Checkout']");
    }

    get checkoutMessage(){
        return $("#do_action p:nth-child(1)");
    }

    get registerLoginLink(){
        return $("//u[text()='Register / Login']");
    }

    get emptyCartText(){
        return $("#empty_cart b");
    }

    async getPriceByProductname(productName){
        return await elementUtil.getText($("//a[text()='"+productName+"']/ancestor::td/following-sibling::td[@class='cart_price']/p"));
    }

    async getQtyByProductname(productName){
        return await elementUtil.getText($("//a[text()='"+productName+"']/ancestor::td/following-sibling::td[@class='cart_quantity']/button"));
    }

    async clickOnDeleteByProductname(productName){
        await elementUtil.click($("//a[text()='"+productName+"']/ancestor::td/following-sibling::td//i"));
    }

    async getTotalByProductname(productName){
        await elementUtil.getText($("//a[text()='"+productName+"']/ancestor::td/following-sibling::td[@class='cart_total']/p"));
    }
}
module.exports = new ShoppingCartPO();