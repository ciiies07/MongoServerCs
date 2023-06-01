const { app, server } = require("../index");
const mongoose = require("mongoose");
const Player = require('../model/playerModel')
const {api, PlayerTest} = require('./helpers')

console.log(PlayerTest);

beforeEach(async () => {
    await Player.deleteMany({})

    const player1 = new Player(PlayerTest[0]);
    player1.save()

    const player2 = new Player(PlayerTest[1])
    player2.save()
})

test("players are returned as json", async () => {
  await api
    .get("/api/players")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 players", async () => {
  const response = await api.get("/api/players");
  expect(response.body).toHaveLength(2);
});

test("not add a new player without name", async () => {
    const newPlayer = {
        team: 'Heat'
    }

    await api
    .post('/api/players')
    .send(newPlayer)
    .expect(400)

    const res = await api.get('/api/players')
    expect(res.body).toHaveLength(PlayerTest.length);
})

test("add new player", async () => {
    const newPlayer = {
        name: 'Guillermo Blanco',
        team: 'Heat'
    }

    await api
    .post('/api/players')
    .send(newPlayer)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/players')

    const players = res.body.map(player => player.name)
    expect(res.body).toHaveLength(PlayerTest.length + 1);
    expect(players).toContain(newPlayer.name)
})

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
