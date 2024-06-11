const elementUtil = require('../utils/elementUtil.js');

class SignUpAndLoginPO{

    get signUpText(){
        return $('.signup-form h2');
    }

    get loginText(){
        return $('.login-form h2');
    }

    get nameTextBox(){
        return $("input[name='name']");
    }

    get signUpEmailTextBox(){
        return $("input[data-qa='signup-email']");
    }

    get signUpButton(){
        return $("button[data-qa='signup-button']");
    }

    get passwordTextBox(){
        return $("//input[@placeholder='Password']");
    }

    get loginEmailTextBox(){
        return $("//input[@data-qa='login-email']");
    }

    get loginButton(){
        return $("//button[text()='Login']");
    }

    get signUpErrorText(){
        return $(".signup-form form p");
    }
    
    async enterSignUpdetails(name, email){
        await elementUtil.setValue(this.nameTextBox,name);
        await elementUtil.setValue(this.signUpEmailTextBox,email);
        await elementUtil.click(this.signUpButton)
    }

    async enterLoginDetails(email, password){
        await elementUtil.setValue(this.loginEmailTextBox,email);
        await elementUtil.setValue(this.passwordTextBox,password);
        await elementUtil.click(this.loginButton)
    }
}

module.exports = new SignUpAndLoginPO();