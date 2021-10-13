import express from "express";
import models from "../../modules/relationTable/relations.js";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { likeValidator } from "./validation.js";

const router = express.Router();
const { Like } = models;
const { Post } = models;
router
  .route("/:postId/:profileId")
  .get(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const isItLikedByTargetUser = await Like.findAll({
          where: {
            postId: req.params.postId,
            profileId: req.params.profileId
          }
        });
        if (isItLikedByTargetUser.length > 0) {
          res.send({ currentUserLikeStatus: true });
        } else {
          res.send({ currentUserLikeStatus: false });
        }
      } else
        next(
          createHttpError(404, `Post  with id ${req.params.postId} not found!`)
        );
    } catch (error) {
      next(error);
    }
  })
  .post(likeValidator, async (req, res, next) => {
    try {
      const errorList = validationResult(req);
      if (!errorList.isEmpty()) {
        next(createHttpError(400, [errorList.errors]));
      }
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        await Like.create(
          {
            profileId: req.params.profileId,
            postId: req.params.postId
          },
          { returning: true }
        );
        res.send({
          message: `${req.params.profileId}'s like has been added to post with the id of ${req.params.postId}`
        });
      } else
        next(
          createHttpError(404, `Post  with id ${req.params.postId} not found!`)
        );
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const targetLike = await Like.findAll({
          where: {
            profileId: req.params.profileId,
            postId: req.params.postId
          }
        });
        if (targetLike) {
          await Like.destroy({
            where: {
              profileId: req.params.profileId,
              postId: req.params.postId
            }
          });
          res.send({
            message: `${req.params.profileId}'s like has been removed from post with the id of ${req.params.postId}`
          });
        } else {
          next(
            createHttpError(
              404,
              `Comment  with id ${req.params.postId} not found!`
            )
          );
        }
      } else
        next(
          createHttpError(404, `Post  with id ${req.params.postId} not found!`)
        );
    } catch (error) {
      next(error);
    }
  });
router.route("/:postId/all").get(async (req, res, next) => {
  try {
    const targetPost = await Post.findByPk(req.params.postId);
    if (targetPost) {
      const likes = await Like.findAll({
        where: {
          postId: req.params.postId
        }
      });
      res.send(likes);
    } else
      next(
        createHttpError(404, `Post  with id ${req.params.postId} not found!`)
      );
  } catch (error) {
    next(error);
  }
});

export default router;
