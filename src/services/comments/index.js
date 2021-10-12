import express from "express";
import models from "../../modules/relationTable/relations.js";
import createHttpError from "http-errors";

const router = express.Router();
const { Comment, Post } = models;

router
  .route("/:postId")
  .get(async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const offset = parseInt(req.query.offset) || 0;
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const comments = await Comment.findAll({
          where: { postId: req.params.postId },
          limit: limit,
          offset: offset
        });
        res.send(comments);
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
        const newComments = await Comment.create({
          ...req.body,
          postId: req.params.postId
        });
        res.send(newComments);
      } else
        next(
          createHttpError(404, `Post  with id ${req.params.postId} not found!`)
        );
    } catch (error) {
      next(error);
    }
  });
router
  .route("/:postId/:commentId")
  .put(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const targetComment = await Post.findByPk(req.params.commentId);
        if (targetComment) {
          const updatedComment = await Comment.update(req.body, {
            where: { id: req.params.commentId },
            returning: true
          });
          res.send(updatedComment);
        } else {
          next(
            createHttpError(
              404,
              `Comment  with id ${req.params.commentId} not found!`
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
  })
  .delete(async (req, res, next) => {
    try {
      const targetPost = await Post.findByPk(req.params.postId);
      if (targetPost) {
        const targetComment = await Post.findByPk(req.params.commentId);
        if (targetComment) {
          const updatedComment = await Comment.destroy({
            where: { id: req.params.commentId }
          });
          res.send(updatedComment);
        } else {
          next(
            createHttpError(
              404,
              `Comment  with id ${req.params.commentId} not found!`
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

export default router;
