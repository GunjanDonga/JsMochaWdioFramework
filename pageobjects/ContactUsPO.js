const elementUtil = require('../utils/elementUtil.js');
const contactUsData = require('../datafactory/ContactUsData.js')
const contactData = contactUsData.getcontactUsData();

class ContactUsPO{
    get getinTouchText(){
        return $(".contact-form h2");
    }

    get nameTextBox(){
        return $("//input[@placeholder='Name']");
    }

    get emailTextBox(){
        return $("//input[@placeholder='Email']");
    }

    get subjectTextBox(){
        return $("//input[@placeholder='Subject']");
    }

    get messageTextBox(){
        return $("//textarea[@id='message']");
    }

    get uploadFileButton(){
        return $("//input[@name='upload_file']");
    }

    get submitButton(){
        return $("//input[@name='submit']");
    }

    get successMessage(){
        return $("//div[@class='status alert alert-success']");
    }

    async uploadFile(){
        const filePath = "C:\\Users\\gunjan\\Pictures\\app_image.png";
      //  const remoteFilePath = await browser.uploadFile(filePath);
        await this.uploadFileButton.setValue(filePath);
        //await $('#file-submit').click()
    }

    async enterDetailsInForm(){
        await elementUtil.setValue(this.nameTextBox,contactData.name);
        await elementUtil.setValue(this.emailTextBox,contactData.email);
        await elementUtil.setValue(this.subjectTextBox,contactData.subject);
        await elementUtil.setValue(this.messageTextBox,contactData.message);
       // await elementUtil.click(this.uploadFileButton);
        await this.uploadFile();
        await elementUtil.click(this.submitButton);
    }

}
module.exports = new ContactUsPO();