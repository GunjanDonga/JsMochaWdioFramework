class PaymentData{
    static getPaymentData(){
        return{
            cardName : "Test",
            cardNumber : 4111111111111111,
            cvc : 756,
            expirationMonth : 55,
            expirationYear : 1523
        };
    }
}

module.exports = PaymentData;