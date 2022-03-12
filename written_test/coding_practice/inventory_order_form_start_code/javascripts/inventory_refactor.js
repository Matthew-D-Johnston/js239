let inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      let date = new Date();
      document.getElementById('order_date').innerHTML = date.toUTCString();
    },
    cacheTemplate: function() {
      let iTmpl = document.getElementById('inventory_item');
      iTmpl.remove();
      this.template = iTmpl.innerHTML;
    },
    add: function() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      let found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemEl) {
      let id = this.findID(itemEl),
          item = this.get(id);

      item.name = itemEl.querySelector("[name^=item_name]").value;
      item.stock_number = itemEl.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemEl.querySelector("[name^=item_quantity]").value;
      console.log(this.collection);
    },
    newItem: function(e) {
      e.preventDefault();
      let item = this.add()
          itemEl = document.createElement('tr');

      let compiledTemplate = Handlebars.compile(this.template);
      itemEl.innerHTML = compiledTemplate(item);

      document.getElementById('inventory').appendChild(itemEl);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(itemEl) {
      return +itemEl.querySelector("input[type=hidden]").getAttribute('value');
    },
    deleteItem: function(e) {
      e.preventDefault();
      
      let itemEl = this.findParent(e);
      itemEl.remove();

      this.remove(this.findID(itemEl));
    },
    updateItem: function(e) {
      let itemEl = this.findParent(e);

      this.update(itemEl);
    },
    bindEvents: function() {
      let self = this;

      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));
      
      let inventoryEl = document.getElementById('inventory');
      inventoryEl.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.tagName === 'A') {
          self.deleteItem(event);
        }
      });

      inventoryEl.addEventListener('click', function(event) {
        inventoryEl.querySelectorAll('input').forEach(inputEl => {
          inputEl.addEventListener('blur', function(e) {
            self.updateItem(e);
          });
        });
      });
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));
