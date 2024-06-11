class ElementUtil{

    async click(element){
        await element.waitForClickable(1000);
        await element.click();
    }

    async setValue(element,value){
        await element.waitForDisplayed();
        await element.waitForEnabled();
        await element.setValue(value);
    }   

    clearValue(element){
        element.waitForDisplayed();
        element.waitForEnabled();
        element.clearValue();
    }

    async getText(element){
        await element.waitForDisplayed();
        return await element.getText();
    }

    getTitleOfPage(pageTitle){
        browser.waitUntil(function(){
            return (browser.getTitle()=== pageTitle)
        },10000, "Title is not found after the given time")
        return browser.getTitle();
    }

    isDisplayed(element){
        element.waitForDisplayed();
        return element.isDisplayed();
    }

    async selectByVisibleTextInDropDown(element,value){
        await element.waitForClickable();
        await element.selectByVisibleText(value);
    }

    async moveToElement(element){
        await element.waitForDisplayed();
        await element.moveTo();
    }
}

module.exports = new ElementUtil();