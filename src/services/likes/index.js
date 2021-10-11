import express from "express";
import models from "../../modules/relations.js";
import createHttpError from "http-errors";

const router = express.Router();
const { Like } = models;

router
  .route("/:postId")
  .get(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const isItLikedByTargetUser = await Like.findAll({
          where: {
            post_id: req.params.postId,
            profile_id: req.body.profile_id
          }
        });
        if (isItLikedByTargetUser.rows > 0) {
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
            profile_id: req.body.profile_id,
            post_id: req.params.postId
          },
          { returning: true }
        );
        res.send({
          message: `${req.body.profile_id}'s like has been added to post with the id of ${req.params.postId}`
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
            profile_id: req.body.profile_id,
            post_id: req.params.postId
          }
        });
        if (targetLike) {
          await Like.destroy({
            where: {
              profile_id: req.body.profile_id,
              post_id: req.params.postId
            }
          });
          res.send({
            message: `${req.body.profile_id}'s like has been removed from post with the id of ${req.params.postId}`
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
          post_id: req.params.postId
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
