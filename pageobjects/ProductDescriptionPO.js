const elementUtil = require("../utils/elementUtil");
const ReviewFormData = require('../datafactory/ReviewFormData.js');
const reviewFormData = ReviewFormData.getReviewFormData();

class ProductDescriptionPO{

    get productTitle(){
        return $('.product-information h2');
    }

    get productQty(){
        return $('#quantity');
    }

    get productPrice(){
        return $("div[class='product-information'] span span");//$('.product-information span:nth-child(1)');
    }

    get addToCartButton(){
        return $('.cart');
    }

    get nameTextBox(){
        return $('#name');
    }

    get emailTextBox(){
        return $('#email');
    }

    get reviewTextBox(){
        return $('#review');
    }

    get submitButton(){
        return $('#button-review');
    }

    get successMessage(){
        return $('.alert-success span');
    }

    async enterDataIntoReviewForm(){
        await elementUtil.setValue(this.nameTextBox,reviewFormData.name);
        await elementUtil.setValue(this.emailTextBox,reviewFormData.email);
        await elementUtil.setValue(this.reviewTextBox,reviewFormData.review);
        await elementUtil.click(this.submitButton);
    }

}
module.exports = new ProductDescriptionPO();