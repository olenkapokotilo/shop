function ProductListModel(products) {
    var self = this;
    this.basketProductsQuantity = 0;
    this.products = []; //TODO: private prop
    this.basketProducts = [];
    this.addProductToBasketEvent = new Event(this);

    if (products) { //TODO: ??? maybe create function get from file
        products.forEach(function (element) {
            self.products.push(element);
        });
    };
}
ProductListModel.prototype = { 
    getProductById: function(id) {
        return this.products.find(function (o) { return o.id == id; });
    },
    getProducts: function () {
        return [].concat(this.products);
    },
    addToBasket: function(id, quantity) {
        var product = this.products.find(function(p) { return p.id == id; });
        if (product) {
            var existInBasket = this.basketProducts.find(function(p) {
                if (p.id == id) {
                    p.quantity += +quantity;
                    return true;
                }
            });
            if (!existInBasket) {
                product.quantity += +quantity; //TODO: add new listner minus quantity product in view
                this.basketProducts.push(product);
            } 
        
            this.basketProductsQuantity += +quantity;
            this.addProductToBasketEvent.notify();
        }else {
            console.log("error: product is not available");
        }
    }
};