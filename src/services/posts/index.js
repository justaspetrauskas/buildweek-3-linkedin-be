import express from 'express'
import db from "../../modules/index.js"

const postsRouter = express.Router()
const { Post, Profile } = db


postsRouter
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Post.findAll({
                include: [
                    Profile
                ],
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    .post(async (req, res, next) => {
        try {
            const post = await Post.create(req.body)
            res.send(post)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

postsRouter
    .route("/:postId")

    .get(async (req, res, next) => {
        try {
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    .put(async (req, res, next) => {
        try {
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    .delete(async (req, res, next) => {
        try {
        } catch (error) {
            console.log(error);
            next(error);
        }
    })

    .post(async (req, res, next) => {
        try {
        } catch (error) {
            console.log(error);
            next(error);
        }
    })

export default postsRouter