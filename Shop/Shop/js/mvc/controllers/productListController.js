function ProductListController(model, view) {
    this.model = model;
    this.view = view;

    this.init();
}
ProductListController.prototype = {
    init: function() {
        this.setupHandlers();
        this.enable();
    },
    setupHandlers: function() {
        this.buyProducHandler = this.buyProduct.bind(this);
    },
    enable: function() {
        this.view.buyProductEvent.attach(this.buyProducHandler);
    },
    buyProduct: function (sender, args) {
        this.model.addToBasket(args.id, args.quantity);
    }
};