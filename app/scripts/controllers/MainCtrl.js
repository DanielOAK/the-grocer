app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  console.log("test");

  $scope.title = 'The Grochery List';
  $scope.editing = false;
  // Keeps track of the current item to use in updateItem
  var currentItem;

  $scope.groceryList;

  $http({
    method: 'GET',
    url: '/grocery-items'
  }).then(function success(response) {
    console.log(response.data);
    $scope.groceryList = response.data;
  }, function error(response) {
    console.log(response);
  });

// create an item via object constructor
// push it to the List
// clear the label box
  $scope.addItem = function() {

    $http({
      method: 'POST',
      url: '/grocery-items',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: 'name='+$scope.itemName+'&price=2'
    }).success(function (data) {
      $scope.groceryList.push(data);
    });

    $scope.itemName = "";
  };


// Get the index of the clicked item
// delete one item from the array starting at that index
  $scope.deleteItem = function(id) {
    // delete data from database here
    // $scope.groceryList.splice(index, 1);
    // /grocery-items?_id=
    $http({
      method: 'DELETE',
      url: '/grocery-items',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: '_id=' + id
    }).success(function (data) {
      $scope.groceryList = data;
      console.log(data);
      // remove item from the list
      console.log("It worked!");
      // $scope.groceryList.push(data);
    });
  };


// toggle editing on
// get item name from list next to clicked pencil
  $scope.editItem = function(item) {
    currentItem = item;
    $scope.editing = true;
    $scope.itemName = item.name;

    // when the pencil icon is clicked
    // change the line to a form input via $scope.editing boolean
    // with name in field
    // when form is submitted, update the data
    // then display list item again

    // update data in database here


  };


// update item with changes
// toggle editing off
// clear label box
  $scope.updateItem = function() {

    console.log(currentItem);
    $http({
      method: 'PUT',
      url: '/grocery-items',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: '_id=' + currentItem._id + "&name=" + $scope.itemName
    }).success(function (data) {
      $scope.groceryList = data;
      console.log(data);
      // remove item from the list
      console.log("It worked!");
      // $scope.groceryList.push(data);
    });


    $scope.editing = false;
    $scope.itemName = "";


  };
}]);
