const shoppingCartPO = require('../pageobjects/ShoppingCartPO.js');
const productDescriptionPO = require('../pageobjects/ProductDescriptionPO.js');
const homePagePO = require('../pageobjects/HomePagePO.js');
const elementUtil = require('../utils/elementUtil.js');
const constants = require('../constants.js');

describe("Verify product details page", function(){
    
    it("Verify product details page",async()=>{
    const productname = "Men Tshirt";
    const actualPrice = await homePagePO.getProductPriceByName(productname);
    console.log("actualPrice",actualPrice);
    await homePagePO.clickOnViewProductButton(productname);
    await expect(await elementUtil.getText(await productDescriptionPO.productTitle)).to.equal(productname); 
    console.log("expectedPrice : "+await (await productDescriptionPO.productPrice).getText());
    const expectedPrice= await elementUtil.getText(await productDescriptionPO.productPrice);
    await expect(expectedPrice).to.equal(actualPrice);
    await elementUtil.setValue(await productDescriptionPO.productQty,6);
    await elementUtil.click(await productDescriptionPO.addToCartButton);
    await elementUtil.click(homePagePO.viewCartLink);

    await expect(await elementUtil.getText(await shoppingCartPO.shoppingCartText)).to.equal(constants.shoppingCartText);
    await expect(await shoppingCartPO.getPriceByProductname(productname)).to.equal(expectedPrice);
    await expect(await shoppingCartPO.getQtyByProductname(productname)).to.equal('6');
    for (const productName of await shoppingCartPO.productNameList) {
      console.log("productName: ",await elementUtil.getText(productName));
      const text = await elementUtil.getText(productName);
      if (text === productname) {
          await productName.click();
          break;
      }
    }
  const productQtyElement = await productDescriptionPO.productQty;
  const productQtyValue = await productQtyElement.getAttribute('value');
  await expect(productQtyValue).to.equal('1');
  });
  })