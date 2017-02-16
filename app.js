(function (){
  'use strict';
  angular.module('ShoppingListApp',[])
      .controller('ToBuyController',  ToBuyController  )
      .controller('AlreadyBoughtController',  AlreadyBoughtController )
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject =  ['ShoppingListCheckOffService'];


function ToBuyController(ShoppingListCheckOffService) {

  var showList = this;

  showList.ToBuyitems = ShoppingListCheckOffService.getItems();
  showList.AddRemoveItem = function(itemIndex) {
    ShoppingListCheckOffService.AddRemoveItem(itemIndex);
  }
}

function AlreadyBoughtController(ShoppingListCheckOffService) {

  var viewList = this;

  viewList.Boughtitems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
    var shopService = this;

    // List of shopping items
    var ToBuyitems =[
  {
    name: "Apples",
    quantity: "5"
  },
  {
    name: "Biscuits",
    quantity: "2 pack"
  },
  {
    name: "Cherries",
    quantity: "3 packs"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Coffee",
    quantity: "1 packet"
  }
];

    var BoughtItems=[];

  /*  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }; */

    shopService.AddRemoveItem = function (itemIdex) {
      BoughtItems.push(ToBuyitems[itemIdex]);
      ToBuyitems.splice(itemIdex, 1);
    };

    shopService.getItems = function () {
      return ToBuyitems;
    };

    shopService.getBoughtItems = function () {
      return BoughtItems;
    };
  }


})();
