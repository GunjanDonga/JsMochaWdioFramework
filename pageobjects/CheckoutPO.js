const elementUtil = require('../utils/elementUtil.js');

class CheckoutPO{
    get deliveryAddress(){
        return $('#address_delivery h3');
    }

    get billingAddress(){
        return $('#address_invoice h3');
    }

    get reviewOrderText(){
        return $("(//h2[@class='heading'])[2]");
    }

    get placeOrderButton(){
        return $("a.check_out");
    }

    get productNameList(){
        return $$('.cart_description a');
    }
}

module.exports = new CheckoutPO();