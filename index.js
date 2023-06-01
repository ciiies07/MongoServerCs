require('dotenv').config();
require('./db/connect.js');
//const http = require("http");
const express = require("express");
//import http from 'http';
const cors = require('cors');
const Player = require('./model/playerModel.js');
const NotFound = require('./errors/not_Found.js');
const castError = require('./errors/castError.js');
const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.method);
//   console.log(req.path);
//   console.log(req.body);
//   console.log(req.params);
//   console.log('--------');
//   next();
// })

// let NBAplayers = [
//   {
//     id: 1,
//     name: "LeBron James",
//     team: "LA Lakers",
//   },
//   {
//     id: 2,
//     name: "Stephen Curry",
//     team: "GS Warriors",
//   },
//   {
//     id: 3,
//     name: "Nikola Jokic",
//     team: "D Nugets",
//   },
//   {
//     id: 4,
//     name: "Ja Morant",
//     team: "M Grizzilies",
//   },
//   {
//     id: 5,
//     name: "Jason Tatum",
//     team: "B Celtics",
//   },
// ];

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "aplication/json" }); //content type
//   res.end(JSON.stringify(NBAplayers))
//   //res.end("Hi, Jancy");
// }); <===== parte que funciona con el http

app.get("/", (req, res) => {
  res.send("<h1>API DE JUGADORES DE LA NBA!<h1/>");
});

app.get("/api/players", (req, res) => {
  Player.find({})
  .then(players => res.json(players))
  .catch(err => console.error(err))
});

app.get("/api/players/:id", (req, res, next) => {
  const {id} = req.params;
  //player = NBAplayers.filter((item) => item.id === id)
  
  Player.findById(id)
  .then(player => {
    player ? res.json(player) : res.status(404).end()
  })
  .catch(err => {
    next(err)
  })
  
});

app.get("/api/players/team/:team", (req, res, next) => {
  const {team} = req.params;
  Player.find({team: team})
  .then(player => {
    player.length !== 0 ?  res.json(player) : res.status(404).send({error: "No se encuentra ninguna informacion con respecto al equipo digitado"})
  })
  .catch(err => {
    next(err)
  })
});

app.delete("/api/players/:id", (req, res, next) => {
  const {id} = req.params
  
  Player.findByIdAndRemove(id)
  .then(() => {
    res.status(204).end();
  }).catch(error => next(error))
  
});

app.post("/api/players", (req, res) => {
  const { name, team } = req.body;

  if(!name){
    return res.status(400).json({
      error: 'El nombre del jugador es un campo requerido.'
    })
  }

  const newPlayer = Player({
    name: name,
    team: team,
  })

  newPlayer.save()
  .then(savedPlayer => {
    res.json(savedPlayer)
    console.log("jugador agregado...");
  })
});

app.put('/api/players/:id', (req, res, next) => {
  const {id} = req.params
  const player = req.body

  const newPlayerInfo = {
    name: player.name,
    team: player.team
  }

  Player.findByIdAndUpdate(id, newPlayerInfo, {new: true})
  .then(result => res.json(wresult))
  .catch(err => console.error(err))
})

app.use(castError)

app.use(NotFound);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {app, server};
