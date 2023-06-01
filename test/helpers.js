const { app} = require("../index");
const supertest = require("supertest");

const api = supertest(app);

const PlayerTest = [
    {
      name: "Jancy Ruben",
      team: "Cavs",
    },
    {
      name: "Pedro Infante",
      team: "Warriors",
    },
  ];


  api,
  module.exports = {
    api,
    PlayerTest,
  }