var app = angular.module('groceryList', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
 });


/* $state - this is where i put states for the view to change (what would have 
  been other html pages before) */
 $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "views/home.html",
      controller: "MainCtrl"
    });
});
