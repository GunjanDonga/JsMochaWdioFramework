const elementUtil = require("../utils/elementUtil");
const PaymentData = require('../datafactory/PaymentData.js');
const paymentData = PaymentData.getPaymentData();
class PaymentPO{

    get paymentHeading(){
        return $('.step-one h2');
    }

    get nameTextBox(){
        return $("//input[@name='name_on_card']");
    }

    get cardNumberTextBox(){
        return $("//input[@name='card_number']");
    }

    get cvcTextBox(){
        return $("//input[@placeholder='ex. 311']");
    }

    get expirationMonthTextBox(){
        return $("//input[@placeholder='MM']");
    }

    get expirationYearTextBox(){
        return $("//input[@placeholder='YYYY']");
    }

    get payAndConfirmButton(){
        return $("//button[@id='submit']");
    }

    get orderPlacedText(){
        return $("h2[class='title text-center'] b");
    }

    get confirmedText(){
        return $("//h2[contains(@class,'title')]/following-sibling::p");
    }

    get downloadInvoiceButton(){
        return $(".check_out");
    }

    get continueButton(){
        return $("//a[text()='Continue']"); 
    }

    async enterPaymentDetails(){
        await elementUtil.setValue(this.nameTextBox,paymentData.cardName);
        await elementUtil.setValue(this.cardNumberTextBox,paymentData.cardNumber);
        await elementUtil.setValue(this.cvcTextBox,paymentData.cvc);
        await elementUtil.setValue(this.expirationMonthTextBox,paymentData.expirationMonth);
        await elementUtil.setValue(this.expirationYearTextBox,paymentData.expirationYear);
        await elementUtil.click(this.payAndConfirmButton);
    }
}

module.exports = new PaymentPO();