import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { connectDB } from "./modules/db-inits.js";
import experience from "./services/experience/experience.js";
import users from "./services/users/user.js";

const server = express();

const { PORT = 5000 } = process.env;

server.use(cors());
server.use(express.json());
//=
server.use("/experience", experience);
server.use("/users", users);
//=
server.listen(PORT, async () => {
  await connectDB();
  console.table(listEndpoints(server));
  console.log(`Port 🚀 => ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server is stoppped ", error);
});
