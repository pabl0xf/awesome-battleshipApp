angular.module("battleShipApp").service("Map", function($http) {
  this.createMap = function(map) {
    return $http.post("/api/map", map);
  }

  this.getMap = function(userId) {
    return $http.get("/api/map/" + userId);
  }
})

.service("Shoot", function($http) {
  this.createShoot = function(params) {
    return $http.post("/api/shoots", params);
  }

  this.getShoots = function(userId) {
    return $http.get("/api/shoots/" + userId);
  }
})

.service("Game", function($http) {
  this.getTurn = function() {
    return $http.get("/api/game/turn");
  }

  this.getWinner = function(userId) {
    return $http.get("/api/game/winner");
  }

  this.resetGame = function() {
    return $http.post("/api/game/reset");
  }
});
