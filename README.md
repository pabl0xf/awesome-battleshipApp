##How to use:

1) Install dependencies

`$ npm install`

2) Run 

`$ node server.js`

##Backend API
```
// GAME
GET'/api/game/winner'  
GET '/api/game/turn' 
POST '/api/game/reset'

// MAP
GET '/api/map/:userId'  
POST '/api/map'  params: { map: [0,0,0...], userId: 1|2}


// SHOOTS
GET '/api/shoots/:userId' // :userId 1|2 
POST '/api/shoots' params: { userId: 1|2, shootIndex: int }
```
