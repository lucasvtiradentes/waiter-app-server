import http from "node:http";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import {
  SERVER_PORT,
  SERVER,
  DATABASE_CONNECTION_URL,
  NODE_ENV,
  UPLOAD_PATH,
} from "./configs/configs";
import { routes } from "./routes";
import { getAllRoutesFromServer } from "./utils/getAllRoutesFromServer";
import { atachReactAppToServer } from "./utils/atachReactAppToServer";

const expressServer = express();
const httpServer = http.createServer(expressServer);

const io = new Server(httpServer);
io.on("connect", () => {
  console.log("Someone has connected!");
});

mongoose.set("strictQuery", false);

mongoose
  .connect(DATABASE_CONNECTION_URL)
  .then(() => {
    console.log("database connected");
    setupServer();
  })
  .catch(() => {
    console.log("error while connecting database");
  });

function setupServer() {
  if (!existsSync(UPLOAD_PATH)) {
    mkdirSync(UPLOAD_PATH);
  }
  expressServer.use("/uploads", express.static(UPLOAD_PATH));

  expressServer.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  expressServer.use(express.json());
  expressServer.use(express.urlencoded({ extended: true }));
  expressServer.use(routes);
  expressServer.get("/api", (req: Request, res: Response) => {
    let allRoutes = getAllRoutesFromServer(expressServer);
    Object.keys(allRoutes).forEach((item) => {
      for (let [route, link] of Object.entries(allRoutes[item])) {
        allRoutes[item][route] = `<a href=${link}>${link}</a>`;
      }
    });
    allRoutes = JSON.stringify(allRoutes, null, 4);
    allRoutes = allRoutes.replace(/\n/g, "<br>");
    allRoutes = allRoutes.replace(/  /g, "&nbsp&nbsp");
    res.send(allRoutes);
  });

  atachReactAppToServer(
    expressServer,
    join(__dirname, "..", "waiter_frontend")
  );

  expressServer.get("*", (req, res) => {
    res.send("Error 404 - Page not found!");
  });

  httpServer.listen(SERVER_PORT, () => {
    console.log(
      `server is on ${NODE_ENV} mode and running on port ${SERVER_PORT} - ${SERVER}`
    );
  });
}

export { io };
