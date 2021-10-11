import express from "express";
import cors from "cors";
import { connectDB } from "./modules/db-inits.js";
import commentsRouter from "./services/comments/index.js";
import likesRouter from "./services/likes/index.js";
import listEndpoints from "express-list-endpoints";
import experience from "./services/experience/experience.js";
import { generError, regError } from "./errorHandler.js";

// imports
import profileRouter from "./services/profile/index.js";
import postsRouter from "./services/posts/index.js";

const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());
server.use(express.json());

server.use("/likes", likesRouter);
server.use("/profile", profileRouter);
server.use("/posts", postsRouter);
server.use("/experience", experience);
server.use("/comments", commentsRouter);

server.listen(PORT, async () => {
  await connectDB();
  console.table(listEndpoints(server));
  console.log(`Port 🚀 => ${PORT}`);
});
//=
// server.use(regError);
// server.use(generError);
server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
