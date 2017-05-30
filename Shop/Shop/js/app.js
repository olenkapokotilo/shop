var model = new ProductListModel([  //TODO: load adn parse json format
                    new Product({ id: "1", name: "name 1", price: 12000,  src: "images/item.png" }),
                    new Product({ id: "2", name: "name 2", price: 42000,  src: "images/item.png" }),
                    new Product({ id: "3", name: "name 3", price: 33000,  src: "images/item.png" }),
                    new Product({ id: "4", name: "name 4", price: 2000, src: "images/item.png" })
                ]),
                view = new ProductListView(model),
                view
            controller = new ProductListController(model, view);

//product model
function Product(item) { //TODO: ? (item) or (name, price...) 
    var self = this;
    self.id = item ? item.id : "";
    self.name = item ? item.name : "";
    self.price = item ? item.price : "";
    self.quantity = 0;//TODO: ??
    self.src = item ? item.src : "";
}