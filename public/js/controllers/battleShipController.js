angular.module("battleShipApp").controller("DashboardController", function($scope, $routeParams, Map, Shoot, Game) {

  $scope.userId = parseInt($routeParams.userId);


  // Init scope vars
  $scope.turn = 0;
  $scope.score = 0;
  $scope.winner = 0;
  $scope.shootDisabled = false;
  $scope.shootsContainer = false;
  $scope.map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  var _resetAndSetWinner = function(winner) {
    Game.resetGame().then(function(){
      $scope.winner = winner;
    }, function(err){
      console.log(err);
    });
  };

  $scope.resetGame = function(){
    Game.resetGame().then(function(response){
      location.reload();
    }, function(err){
      console.log(err);
    });
  };

  var _startGame = function() {
    Shoot.getShoots($scope.userId).then(function(response){
      $scope.shoots = response.data.shoots;
    }, function(err){
      console.log(response);
    });

    var turnLoop = setInterval(function() {
      Game.getTurn().then(function(response){
        $scope.turn = response.data.turn;

        if ($scope.turn !== 0) {
          Map.getMap($scope.userId).then(function(response){
            $scope.map = response.data.map;
          }, function(err){
            clearInterval(turnLoop);
            console.log(err);
          });
        }
      }, function(err){
        clearInterval(turnLoop);
        console.log(err);
      });

      if ($scope.turn == 3) {
        clearInterval(turnLoop);
        Game.getWinner().then(function(response){
          _resetAndSetWinner(response.data.winner);
        }, function(err){
          console.log(err);
        });
      }
    }, 3000);

    $scope.shootsContainer = true;
  }

  $scope.iAmReady = function() {
    console.log('$scope.map', $scope.map);

    Map.createMap({ map: $scope.map, userId: $scope.userId}).then(function(result){
      _startGame();
    }, function(err){
      console.log(err);
    });
  }

  $scope.markShoot = function(e) {
    $(".board .active").removeClass('active');
    $(event.target).addClass('active');
  }

  $scope.makeShoot = function() {
    if ($scope.turn === $scope.userId) {
      $scope.turn = $scope.turn === 1 ? 2 : 1;
      var shootIndex = $(".board .active").data('shootIndex');
      if($scope.shoots[shootIndex] === 1){
        alert('Don\'t waste ammo, you already shoot at that position')
        return;
      }
      Shoot.createShoot({ userId: $scope.userId, shootIndex: shootIndex }).then(function(response){
        $scope.shoots = response.data.shoots;
        $scope.score = response.data.score;
      }, function(err){
        console.log(err);
      });

      $(".board .active").removeClass('active');
    } else {
      console.log('turn: ', $scope.turn);
    }
  }

  $scope.reloadGame = function() {
    location.reload();
  }
});
