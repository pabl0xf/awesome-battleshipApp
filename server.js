var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Initialize map variable
var map_1 = [];
var map_2 = [];
var shoots_1 = [];
var shoots_2 = [];
var userStatus_1 = false;
var userStatus_2 = false;
var turn = 0;
var winner = 0;
var winner_score = 8;
var score_1 = 0;
var score_2 = 0;

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// Game ENDPOINTS

app.post('/api/game/reset', function(req, res) {
  map_1 = [];
  map_2 = [];
  shoots_1 = [];
  shoots_2 = [];
  userStatus_1 = false;
  userStatus_2 = false;
  turn = 0;
  winner = 0;
  score_1 = 0;
  score_2 = 0;

  res.json({ success: true });
});

app.get('/api/game/winner', function(req, res){
  res.json({ winner: winner });
});

app.get('/api/game/turn', function(req, res){
  res.json({ turn: turn });
});


// Map ENDPOINTS

app.get('/api/map/:userId', function(req, res){
  var userId = req.params.userId;

  if (userId == 1) {
    res.json({ map: map_1 });
  } else {
    res.json({ map: map_2 });
  }
});

app.post('/api/map', function(req, res){
  var id = req.body.userId;

  if (id == 1) {
    map_1 = req.body.map;
    shoots_1 = [
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
    userStatus_1 = true
  } else {
    map_2 = req.body.map;
    shoots_2 =  [
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
    userStatus_2 = true;
  }

  if (userStatus_1 && userStatus_2) {
    turn = 1;
  }

  res.json({ success: true });
});

// Shoots ENDPOINTS

app.get('/api/shoots/:userId', function(req, res){
  var userId = req.params.userId;

  if (userId == 1) {
    res.json({ shoots: shoots_1 });
  } else {
    res.json({ shoots: shoots_2 });
  }
});

app.post('/api/shoots', function(req, res) {
  var userId = req.body.userId;
  var shootIndex = req.body.shootIndex;

  if (userId != turn) {
    res.json({ success: false });
  } else {
    if (userId == 1) {
      shoots_1[shootIndex] = 1;
      map_2[shootIndex] = (map_2[shootIndex] != 0? 2 : 3);

      if (map_2[shootIndex] == 2) {
        score_1++;
      }
      
      if (score_1 == winner_score) {
        winner = 1;
        turn = 3;
      } else {
        turn = 2;
      }
      
      res.json({ success: true, shoots: shoots_1, score: score_1 });
    } else {
      shoots_2[shootIndex] = 1;
      map_1[shootIndex] = (map_1[shootIndex] != 0? 2 : 3);

      if (map_1[shootIndex] == 2) {
        score_2++;
      }
      
      if (score_2 == winner_score) {
        winner = 2;
        turn = 3;
      } else {
        turn = 1;
      }
      res.json({ success: true, shoots: shoots_2, score: score_2 });
    }
  }
});

app.use('*',function(req,res,next){
  res.sendFile('index.html', { root: __dirname + "/public" });
});

