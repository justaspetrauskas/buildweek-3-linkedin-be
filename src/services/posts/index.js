import express from "express";
import models from "../../modules/relationTable/relations.js";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { postValidator } from "./validation.js";

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
            next(error)
        }
    })

    .post(postValidator, async (req, res, next) => {
        const errorList = validationResult(req);
        if (!errorList.isEmpty()) {
            next(createHttpError(400, [errorList.errors]));
        } else {
            try {
                const post = await Post.create(req.body);
                res.send(post);
            } catch (error) {
                next(createHttpError(500));
            }
        }
    });

postsRouter
    .route("/:postId")

    .get(async (req, res, next) => {
        try {
            const data = await Post.findOne({
                where: { id: req.params.postId },
                include: Profile,
            });
            if (data) {
                res.send(data);
            } else {
                res.status(404).send("Post not found");
            }
        } catch (error) {
            next(createHttpError(500))
        }
    })

    .put(postValidator, async (req, res, next) => {
        try {
            const data = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                },
                returning: true,
            });
            res.send(data[1][0]);
        } catch (error) {
            next(createHttpError(400, err.message))
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
            next(createHttpError(400, err.message))
        }
    });

export default postsRouter;
