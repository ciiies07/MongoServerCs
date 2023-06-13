const { app} = require("../index");
const supertest = require("supertest");

const api = supertest(app);

const PlayerTest = [
    {
      name: "Jancy Ruben",
      team: "Lakers",
    },
    {
      name: "Pedro Infante",
      team: "Warriors",
    },
    {
      name: 'Guillermo Blanco',
      team: 'Heat'
    },
    {
      name: 'Jho Cespedes',
      team: 'Boston'
    },
    {
      name: 'Winston Almonte',
      team: 'Nugets'
    }
  ];

  const getAllPlayersNames = async () => {
    const res = await api.get('/api/players')
    return {
      players: res.body.map(player => player.name),
      res
    }
  }

  api,
  module.exports = {
    api,
    PlayerTest,
    getAllPlayersNames
  }