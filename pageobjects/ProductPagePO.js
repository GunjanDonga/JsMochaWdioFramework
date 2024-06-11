class ProductPagePO{

get searchProductTextBox(){
    return $('input#search_product');
}

get searchProductButton(){
    return $('button#submit_search');
}

get allProductLabel(){
    return $('.title');
}

get allProductNamelist(){
    return $$(".productinfo p");
}
}
module.exports = new ProductPagePO();