// OBSERVER
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}
Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {
        var index;
        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};
// MODEL
function ListModel(items) {
    var self = this;
    self._items = new Array();
    self.selectedItems = new Array();
    self.basketCount = 0;
    self.addItemToBasket = new Event(self);

    if (items) {
        items.forEach(function (element) {
            var product = new Product(element);
            self._items.push(product);
        });
    };  
}
ListModel.prototype = {
    getItems : function () {
        return [].concat(this._items);
    },
    addItem: function (item) {
        this.selectedItems.push(item);//TODO: src
        this.addItemToBasket.notify({ item: item });
    }
};

// VIEW

function ListView(model, element) {
    this._model = model;
    this._element = element;
    this.addButtonClicked = new Event(this);
    var self = this;

    this._model.addItemToBasket.attach(function () {
        self.basketCount();
    });


    this._element.addButton.onclick = function () {
        self.addButtonClicked.notify();
    };
}
ListView.prototype = {
    show : function () {
        this.buildList();
    },
    buildList : function () {
        var list, items, key;
        list = this._element.list; 
        items = this._model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                var image = document.createElement("img");
                image.alt = items[key].name;
                if (image.complete) {
                    image.src = items[key].src;
                    var name = document.createElement("p");
                    name.innerHTML = items[key].name;
                    name.className = "name-item";
                    var quantity = document.createElement("p");
                    quantity.className = "quantity";
                    quantity.innerHTML = "quantity";

                    var quantityValue = document.createElement("span");
                    quantityValue.name = "quantity";
                    quantityValue.innerHTML = items[key].quantity;

                    var plusBtn = document.createElement("button");
                    plusBtn.className = "transparent-btn";
                    plusBtn.name = "plus";
                    plusBtn.innerHTML = "+";

                    var minusBtn = document.createElement("button");
                    minusBtn.className = "transparent-btn";
                    minusBtn.name = "minus";
                    minusBtn.innerHTML = "-";
                    quantity.appendChild(quantityValue);
                    quantity.appendChild(plusBtn);
                    quantity.appendChild(minusBtn);

                    var price = document.createElement("p");
                    price.className = "price";

                    var priceValue = document.createElement("span");
                    priceValue.name = "price";
                    priceValue.innerHTML = items[key].price + "$";

                    var buyBtn = document.createElement("button");
                    buyBtn.className = "transparent-btn";
                    buyBtn.name = "buy";
                    buyBtn.innerHTML = "buy";
                    price.appendChild(priceValue);
                    price.appendChild(buyBtn);

                    var gridItem = document.createElement("div");
                    gridItem.className = "grid-item";
                    gridItem.appendChild(name);

                    gridItem.appendChild(image);
                    gridItem.appendChild(quantity);
                    gridItem.appendChild(price);

                    var wrap = document.createElement("div");
                    wrap.className = "col-lg-3";
                    wrap.appendChild(gridItem);
                    list.appendChild(wrap);

                };
            }
        }
        
    },

    basketCount: function () {
        var quantityString, basketCountString, basketCount;
        quantityString = "quantity"; //TODO: minus quantity and if(quantity<=0)
        basketCountString = "card items";
        document.querySelectorAll('.basket p')[0].innerHTML = basketCountString + " " + this._model.selectedItems.length;
    }
};

// CONTROLLER
function ListController(model, view) {
    var self = this;
    self._model = model;
    self._view = view;
    
    
    self._view.addButtonClicked.attach(function () {
        self.addItem();
    });
}
ListController.prototype = {
    addItem: function () {
        var name = document.getElementsByClassName('name-item')[0].innerHTML;
        var price = getFirstElementByName('price').innerHTML;
        var quantity = getFirstElementByName('quantity').innerHTML;
        this._model.addItem(new Product({'name': name, 'price': price, 'quantity': quantity}));
    }
};
// TODO: queryselector 
function getFirstElementByName(elementName) {
    var elements = document.getElementsByName(elementName);
    if (elements.length) {
        return elements[0];
    } else {
        return undefined;
    }
}


//produnct model
function Product(item) { //TODO: ? (item) or (name, price...) 
    var self = this;
    self.id = item ? item.id : "";
    self.name = item ? item.name : "";
    self.price = item ? item.price : "";
    self.quantity = item ? item.quantity : "";
    self.src = item ? item.src : "";
}