const bcrypt = require("bcrypt");
const usersRouter = require("express").Router(); //rutas separadas
const User = require("../model/UserModel");

usersRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { username, name, password } = body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
});

module.exports = usersRouter;
