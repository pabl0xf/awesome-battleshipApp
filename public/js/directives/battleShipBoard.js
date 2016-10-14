angular.module("battleShipApp").directive("battleBoard", function() {
  return {
    link: function(scope, element, attrs) {
      var shipSize = 0;
      var shipKind = null;
      var shipHorizontal = true;
      var shipsAdded = 0;
      scope.ready = false;
      scope.battleShipKinds = {};

      var checkHorizontalBoundaries = function(index){
        if(shipSize==2 && index.toString().endsWith('9')||
        shipSize==3 && index.toString().endsWith('8') ||
        shipSize==3 && index.toString().endsWith('9') ||
        shipSize===2 && scope.map[index] === 1 && scope.map(index+1) === 1 ||
        shipSize===3 && scope.map[index+2] === 1
      ){
        return true;
      }
      return false;
    }
    var checkVerticalBoundaries = function(index){
      if(shipSize==2 && index.toString().startsWith('9')||
      shipSize==3 && index.toString().startsWith('8') ||
      shipSize==3 && index.toString().startsWith('9') ||
      shipSize===2 && scope.map[index] === 1 && scope.map(index+10) === 1 ||
      shipSize===3 && scope.map[index+20] === 1
    ){
      return true;
    }
    return false;
  }


  scope.selectShip = function(size, kind){
    shipSize = size;
    shipKind = kind;
  }

  scope.addShip = function(index){

    if(shipsAdded===3){
      alert('all your sheeps are in position for battle!');
      return;
    }

    if(shipSize<=1){
      alert('Please select a one of the battleship class first');
      return;
    }

    if(shipHorizontal && !checkHorizontalBoundaries(index)){
      scope.map[index] = 1;
      scope.map[index+1] = 1;
      if(shipSize>2){
        scope.map[index+2] = 1;
      }

    }
    else if(!shipHorizontal && !checkVerticalBoundaries(index)){
      scope.map[index] = 1;
      scope.map[index+10] = 1;
      if(shipSize>2){
        scope.map[index+20] = 1;
      }
    }
    else{
      return;
    }
    scope.battleShipKinds[shipKind] = true;
    shipsAdded++;
    shipSize = 0;
    if(shipsAdded===3){
      scope.ready = true;
    }
  }

  scope.rotateShip = function(){
    shipHorizontal = !shipHorizontal;
  }

  scope.hoverSiblings = function(index){

    if(!shipSize || shipSize<=1 ||
      shipHorizontal && checkHorizontalBoundaries(index) ||
      !shipHorizontal && checkVerticalBoundaries(index)  ||
      scope.map[index]===1){
        return;
      }

      if(!shipHorizontal){
        $("div[data-fleet-index='"+index+"']").css("background-color", "gray");
        index+=10;
        $("div[data-fleet-index='"+index+"']").css("background-color", "gray");
        if(shipSize>2){
          index+=10;
          $("div[data-fleet-index='"+index+"']").css("background-color", "gray");
        }
        return;

      }
      $("div[data-fleet-index='"+index+"']").css("background-color", "gray");
      index++;
      $("div[data-fleet-index='"+index+"']").css("background-color", "gray");

      if(shipSize>2){
        index++;
        $("div[data-fleet-index='"+index+"']").css("background-color", "gray");
      }
    }

    scope.outSiblings = function(index){
      if(!shipSize || shipSize<=1 || scope.map[index]===1){
        return;
      }
      if(shipHorizontal && checkHorizontalBoundaries(index)||
      !shipHorizontal && checkVerticalBoundaries(index)
    ){
      return true;
    }
    if(!shipHorizontal){
      $("div[data-fleet-index='"+index+"']").css("background-color", "");
      index+=10;
      $("div[data-fleet-index='"+index+"']").css("background-color", "");
      if(shipSize>2){
        index+=10;
        $("div[data-fleet-index='"+index+"']").css("background-color", "");
      }
      return;

    }
    $("div[data-fleet-index='"+index+"']").css("background-color", "");
    index++;
    $("div[data-fleet-index='"+index+"']").css("background-color", "");

    if(shipSize>2){
      index++;
      $("div[data-fleet-index='"+index+"']").css("background-color", "");
    }
  }
},
templateUrl : "js/directives/templates/battleBoard.html"
};
})
