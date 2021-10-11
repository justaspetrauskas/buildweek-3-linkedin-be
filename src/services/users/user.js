import express from "express";
import s from "sequelize";
import db from "../../modules/shem/connect.js";

const users = express.Router();
const { Profile, Experience } = db;
//=
users
  .route("/")
  .get(async (req, res, next) => {
    try {
      const user = await Profile.findAll();
      res.send(user);
    } catch (error) {}
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await Profile.create(req.body);
      res.send(newUser);
    } catch (error) {}
  });
users.route("/:id").get(async (req, res, next) => {
  try {
    const user = await Profile.findAll({
      include: Experience,
      where: { id: req.params.id },
    });
    res.send(user);
  } catch (error) {}
});

export default users;
