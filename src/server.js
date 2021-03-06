import express from "express";
import cors from "cors";
import { connectDB } from "./modules/db-inits.js";
import commentsRouter from "./services/comments/index.js";
import likesRouter from "./services/likes/index.js";
import listEndpoints from "express-list-endpoints";
import experience from "./services/experience/experience.js";
import { generError, regError } from "./errorHandler.js";
import yaml from "yamljs";
import swaggerUI from "swagger-ui-express";
import { join } from "path";
// import { notFoundHandler, badRequestHandler, genericErrorHandler } from "./errorHandler.js";

// imports
import profileRouter from "./services/profile/index.js";
import postsRouter from "./services/posts/index.js";

const server = express();

const { PORT = 5000 } = process.env;

const yamlDocument = yaml.load(
  join(process.cwd(), "./src/services/docs/postsAndProfilesMissing.yaml")
);

server.use(cors());
server.use(express.json());

server.use("/likes", likesRouter);
server.use("/profile", profileRouter);
server.use("/posts", postsRouter);
server.use("/experience", experience);
server.use("/comments", commentsRouter);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(yamlDocument));

server.listen(PORT, async () => {
  await connectDB();
  console.table(listEndpoints(server));
  console.log(`Port 🚀 => ${PORT}`);
});

// server.use(notFoundHandler);
// server.use(badRequestHandler);
// server.use(genericErrorHandler);

server.use(regError);
server.use(generError);
server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
