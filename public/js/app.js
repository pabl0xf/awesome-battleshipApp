angular.module("battleShipApp", ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

  $routeProvider
  .when("/", {
    redirectTo: "/player/1"
  })
  .when("/player/:userId", {
    controller: "DashboardController",
    templateUrl: "dashboard.html"
  })
  .otherwise({
    redirectTo: "/player/1"
  });

  $locationProvider.html5Mode(true);
});
