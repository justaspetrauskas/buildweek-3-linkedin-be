import express from "express";
import models from "../../modules/relationTable/relations.js";

const postsRouter = express.Router();
const { Post, Profile } = models;

postsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Post.findAll({
        include: [Profile],
        limit: req.query.limit * 5 || 5,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const post = await Post.create(req.body);
      res.send(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

postsRouter
  .route("/:postId")

  .get(async (req, res, next) => {
    try {
      const data = await Post.findOne({
        where: { id: req.params.id },
        include: Profile,
      });
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .put(async (req, res, next) => {
    try {
      const data = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const rows = await Post.destroy({ where: { id: req.params.id } });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const path = req.file.path;
      console.log(path);
      const newImage = await Post.update(
        { image: path },
        {
          where: {
            id: req.params.postId,
          },

          returning: true,
        }
      );
      res.send(newImage[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default postsRouter;
