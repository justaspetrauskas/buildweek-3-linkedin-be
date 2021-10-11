import express from "express";
import s from "sequelize";
import db from "../../modules/shem/connect.js";

const experience = express.Router();
const { Experience, User } = db;
//=
experience
  .route("/")
  .get(async (req, res, next) => {
    try {
      const exper = await Experience.findAll();
      res.send(exper);
    } catch (error) {}
  })
  .post(async (req, res, next) => {
    try {
      const exper = await Experience.create(req.body);
      res.send(exper);
    } catch (error) {}
  });
experience.route("/:expId").get(async (req, res, next) => {
  try {
    const exper = await Experience.findAll({
      include: User,
      where: { id: req.params.expId },
    });
    res.send(exper);
  } catch (error) {}
});

export default experience;
