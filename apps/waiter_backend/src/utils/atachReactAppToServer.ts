import { existsSync } from "node:fs";
import { join } from "node:path";

import express, { Express, Request, Response } from "express";

export function atachReactAppToServer(
  expressServer: Express,
  folderPath: string,
  serverPath: string = ""
) {
  console.log(`attaching ${folderPath}`);
  if (existsSync(folderPath)) {
    expressServer.use(express.static(folderPath));
    expressServer.get(`${serverPath}/*`, (req: Request, res: Response) => {
      res.sendFile(join(folderPath, "index.html"));
    });
    console.log("DONE");
  }
}
