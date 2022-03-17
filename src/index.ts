import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();
const port = 8000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Example app listening at http://localhost:${port}/`);
});
