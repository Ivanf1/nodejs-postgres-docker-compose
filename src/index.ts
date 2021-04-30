import "dotenv/config";
import express, { Request, Response } from "express";
import db from "./db/db";

const app = express();

app.get("/", async (_request: Request, response: Response) => {
  const post = await db("posts");
  response.json(post);
});

const port = 4000;

app.listen(port, () => {
  console.log("Server started");
});
