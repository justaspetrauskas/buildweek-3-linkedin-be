import express from "express";
import models from "../../modules/relationTable/relations.js";
import createHttpError from "http-errors";

const router = express.Router();
const { Like } = models;
const { Post } = models;
router
  .route("/:postId")
  .get(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const isItLikedByTargetUser = await Like.findAll({
          where: {
            postId: req.params.postId,
            profileId: req.body.profileId
          }
        });
        console.log(isItLikedByTargetUser);
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
  .post(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        await Like.create(
          {
            profileId: req.body.profileId,
            postId: req.params.postId
          },
          { returning: true }
        );
        res.send({
          message: `${req.body.profileId}'s like has been added to post with the id of ${req.params.postId}`
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
            profileId: req.body.profile_id,
            postId: req.params.postId
          }
        });
        if (targetLike) {
          await Like.destroy({
            where: {
              profileId: req.body.profileId,
              postId: req.params.postId
            }
          });
          res.send({
            message: `${req.body.profileId}'s like has been removed from post with the id of ${req.params.postId}`
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
