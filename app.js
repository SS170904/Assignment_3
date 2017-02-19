(function (){
  'use strict';
  angular.module('MenuSearchApp',[])
      .controller('NarrowItDownController',  NarrowItDownController   )
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective)
      .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

      function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'itemsloaderindicator.html',
          scope: {
            found: '<',
          //  myTitle: '@title',
          //  badRemove: '=',
           onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'searchDirCtrl',
          bindToController: true
          //link: shoppingListDirectiveLink
        };

      return ddo;
      }



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var searchController = this;
  searchController.searchTerm = ' ';

  searchController.getMenuItems = function (searchTerm) {
    if (searchTerm != '' )
     {
       searchController.showMessage = '';
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function (response){
          var i = 0;
          searchController.found = [];
          for (i=0;i<=response.data.menu_items.length-1;i++){

            if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1){
              searchController.found.push(response.data.menu_items[i]);
            }
          }
        })
        .catch(function(error){
          console.log("Something went wrong !");
        });
      }
    else {
        searchController.showMessage="Nothing Found!";
        searchController.found = [];
    }
  }

  searchController.removeItem = function(itemIndex) {
    searchController.found.splice (itemIndex, 1);
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

    var menuService = this;

    var foundArray=[];

    menuService.getMatchedMenuItems = function(searchItem)  {
      var response =  $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    }
})();
