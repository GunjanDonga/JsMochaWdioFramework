const elementUtil = require('../utils/elementUtil.js');
const SignUpData = require('../datafactory/SignUpData.js');
const userData = SignUpData.getSignUpData();

class AccountInfoPO{

get titleOfPage(){
    return $(".title:nth-child(1) b");
}
get titleRadioButton(){
    return $("#id_gender2");
}
get nameTextBox(){
    return $("#name");
}
get emailTextBox(){
    return $("#email");
}
get passwordTextBox(){
    return $("#password");
}
get firstNameTextBox(){
    return $("#first_name");
}
get lastNameTextBox(){
    return $("#last_name");
}
get address1TextBox(){
    return $("#address1");
}
get countryDropDown(){
    return $("#country");
}
get stateTextBox(){
    return $("#state");
}
get cityTextBox(){
    return $("#city");
}
get zipcodeTextBox(){
    return $("#zipcode");
}
get mobileNumberTextBox(){
    return $("#mobile_number");
}
get createAccountButton(){
    return $("//button[text()='Create Account']");
}

get accountCreatedText(){
    return $('.title b');
}

get accountCreatedSuccessMessage(){
    return $("//*[@id='form']//p[1]");
}

async enterAccountDetails(){
    await elementUtil.click(this.titleRadioButton);
    await elementUtil.setValue(this.passwordTextBox,userData.password);
    await elementUtil.setValue(this.firstNameTextBox,userData.firstname);
    await elementUtil.setValue(this.lastNameTextBox,userData.lastname);
    await elementUtil.setValue(this.address1TextBox,userData.address);
    await elementUtil.selectByVisibleTextInDropDown(this.countryDropDown,userData.country);
    await elementUtil.setValue(this.stateTextBox,userData.state);
    await elementUtil.setValue(this.cityTextBox,userData.city);
    await elementUtil.setValue(this.zipcodeTextBox,userData.zipcode);
    await elementUtil.setValue(this.mobileNumberTextBox,userData.mobileNumber);
    await elementUtil.click(this.createAccountButton);
}
}
module.exports = new AccountInfoPO();