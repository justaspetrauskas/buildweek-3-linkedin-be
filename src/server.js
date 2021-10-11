import express from "express";
import cors from "cors";
import { connectDB } from "./modules/db-inits.js";
import commentsRouter from "./services/comments/index.js";
import likesRouter from "./services/likes/index.js";

// imports
import profileRouter from "./services/profile/index.js";
import postsRouter from "./services/posts/index.js"

const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());

server.use(express.json());

server.use("/comments", commentsRouter);
server.use("/likes", likesRouter);
server.use("/profile", profileRouter);
server.use("/posts", postsRouter)

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});