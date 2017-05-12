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
    this._items = items;    //TODO: add product model
    this.selectedItems = new Array();
    this.basketCount = 0;
    this.addItemToBasket = new Event(this);
   
}
ListModel.prototype = {
    addItem: function (item) {
        this.selectedItems.push(item);
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
    basketCount: function () {
        var quantityString, basketCountString, basketCount;
        quantityString = "quantity";
        basketCountString = "card items";
        document.querySelectorAll('.basket p')[0].innerHTML = basketCountString + " " + this._model.selectedItems.length;
    }
};

// CONTROLLER
function ListController(model, view) {
    this._model = model;
    this._view = view;
    var self = this;
    
    this._view.addButtonClicked.attach(function () {
        self.addItem();
    });
}
ListController.prototype = {
    addItem: function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this._model.addItem(item);
        }
    }
};

function getFirstElementByName(element_name) {
    var elements = document.getElementsByName(element_name);
    if (elements.length) {
        return elements[0];
    } else {
        return undefined;
    }
}
// start
//$(function () {
//    var model = new ListModel(['bmw', 'reno']),
//        view = new ListView(model, {
//            'addButton': getFirstElementByName('plus')
//        }),
//        controller = new ListController(model, view);

//});