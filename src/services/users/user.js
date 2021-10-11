import express from "express";
import s from "sequelize";
import db from "../../modules/shem/connect.js";

const users = express.Router();
const { User, Experience } = db;
//=
users
  .route("/")
  .get(async (req, res, next) => {
    try {
      const user = await User.findAll();
      res.send(user);
    } catch (error) {}
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body);
      const newUser = await User.create(req.body);
      res.send(newUser);
    } catch (error) {}
  });
users.route("/:id").get(async (req, res, next) => {
  try {
    const user = await User.findAll({
      include: Experience,
      where: { id: req.params.id },
    });
    res.send(user);
  } catch (error) {}
});

export default users;
