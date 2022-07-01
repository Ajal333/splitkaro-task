import express, { Express, Request, Response, Router } from "express";

import expenseRouter from "./routes/expense.routes";
import groupRoutes from "./routes/group.routes";

const app: Express = express();

const router: Router = express.Router();

const DATABASE_URL =
  'mysql://p7ydyftztjed:pscale_pw_w8bWolaZpSi_zdjdKAo2StW5SmzIpFX5wBEc_dLWT6Q@xz0u2mgf3j2r.us-east-4.psdb.cloud/splikaro?ssl={"rejectUnauthorized":true}';

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const port: number = 5000;

app.use("/expense", expenseRouter);
app.use("/group", groupRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export = router;
